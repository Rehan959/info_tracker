import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

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
    const { userId } = await auth()
    
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

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: `User not found with Clerk ID: ${userId}` },
        { status: 404 }
      )
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

    // Create new influencer
    const influencer = await prisma.influencer.create({
      data: {
        userId: user.id,
        name: profileData?.name || username,
        username: username,
        platform: platform as any,
        profileUrl: url,
        followers: profileData?.followers || 0,
        engagement: 0,
        bio: profileData?.bio || `Added via profile link: ${url}`,
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
