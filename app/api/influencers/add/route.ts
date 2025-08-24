import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { UserService } from '@/lib/services/userService'

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

    // Get or create user from database
    let user = await UserService.getUserByClerkId(userId)
    
    if (!user) {
      // Try to get user info from Clerk and create if needed
      try {
        // For now, create a basic user - in production you'd get this from Clerk API
        user = await UserService.findOrCreateUser(
          userId, 
          `user-${userId}@example.com`, // Placeholder email
          'User' // Placeholder name
        )
        console.log(`✅ Created new user for Clerk ID: ${userId}`)
      } catch (error) {
        console.error('Failed to create user:', error)
        return NextResponse.json(
          { error: 'Failed to create user account' },
          { status: 500 }
        )
      }
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
