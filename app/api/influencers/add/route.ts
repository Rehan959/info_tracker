import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UserService } from '@/lib/services/userService'
import { getUserIdFromRequest } from '@/lib/auth'
import { SocialMediaService } from '@/lib/services/socialMediaService'
import { parseFollowerCount } from '@/lib/utils'

interface AddInfluencerRequest {
	url: string
	platform: string
	username: string
	profileData?: {
		name: string
		followers: number
		bio: string
		profilePicture?: string
		isVerified?: boolean
	}
}

export async function POST(request: NextRequest) {
	try {
		const userId = getUserIdFromRequest(request)
		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			)
		}

		const body: AddInfluencerRequest = await request.json()
		const { url, platform, username, profileData } = body

		if (!url || !platform || !username) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			)
		}

		// Find user by internal id
		const user = await prisma.user.findUnique({ where: { id: userId } })
		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		// Check if influencer already exists for this user
		const existingInfluencer = await prisma.influencer.findFirst({
			where: {
				userId: user.id,
				username: username,
				platform: platform as any
			}
		})

		if (existingInfluencer) {
			return NextResponse.json(
				{ error: 'Influencer already exists' },
				{ status: 409 }
			)
		}

		// Scrape-first verification
		let effectiveProfile = profileData
		try {
			const lookup = url || `${platform}:${username}`
			const scraped = await SocialMediaService.getProfileFromLinkScrapeFirst(lookup)
			if (scraped) {
				effectiveProfile = {
					name: (scraped as any).name ?? effectiveProfile?.name,
					followers: (scraped as any).followers ?? effectiveProfile?.followers,
					bio: (scraped as any).bio ?? effectiveProfile?.bio,
					profilePicture: (scraped as any).profilePicture ?? effectiveProfile?.profilePicture,
					isVerified: (scraped as any).isVerified ?? effectiveProfile?.isVerified
				} as any
			} else {
				return NextResponse.json(
					{ error: 'Unable to verify profile for the provided URL' },
					{ status: 422 }
				)
			}
		} catch (e) {
			// proceed with provided data
		}

		// Create new influencer
		const influencer = await prisma.influencer.create({
			data: {
				userId: user.id,
				name: effectiveProfile?.name || username,
				username: username,
				platform: platform as any,
				profileUrl: url,
				followers: parseFollowerCount((effectiveProfile as any)?.followers),
				engagement: 0,
				bio: effectiveProfile?.bio || `Added via profile link: ${url}`,
				status: 'ACTIVE'
			}
		})

		return NextResponse.json({
			success: true,
			influencer: {
				id: influencer.id,
				username: influencer.username,
				platform: influencer.platform,
				profileUrl: influencer.profileUrl
			}
		})

	} catch (error) {
		console.error('Add Influencer API Error:', error)
		return NextResponse.json(
			{ error: 'Failed to add influencer' },
			{ status: 500 }
		)
	}
}
