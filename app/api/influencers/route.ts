import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Fetch all influencers for this user
    const influencers = await prisma.influencer.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      influencers: influencers
    })

  } catch (error) {
    console.error('Get Influencers API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch influencers' },
      { status: 500 }
    )
  }
}

// POST /api/influencers - Create new influencer
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const {
      name,
      username,
      platform,
      followers = 0,
      engagement = 0,
      bio,
      avatar,
      website,
      email,
      phone,
      location,
      category,
      status = 'ACTIVE'
    } = body

    if (!name || !username || !platform) {
      return NextResponse.json({ 
        error: 'Name, username, and platform are required' 
      }, { status: 400 })
    }

    const influencer = await prisma.influencer.create({
      data: {
        userId: user.id,
        name,
        username,
        platform,
        followers,
        engagement,
        bio,
        avatar,
        website,
        email,
        phone,
        location,
        category,
        status
      }
    })

    return NextResponse.json(influencer, { status: 201 })
  } catch (error) {
    console.error('Error creating influencer:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ 
        error: 'Influencer with this username and platform already exists' 
      }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
