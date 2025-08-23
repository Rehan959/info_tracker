import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// GET /api/influencers/[id] - Get specific influencer
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const influencer = await prisma.influencer.findFirst({
      where: {
        id: params.id,
        userId: user.id
      },
      include: {
        posts: {
          orderBy: { publishedAt: 'desc' },
          take: 20
        },
        campaigns: {
          include: {
            campaign: true
          }
        },
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: {
            posts: true,
            campaigns: true,
            activities: true
          }
        }
      }
    })

    if (!influencer) {
      return NextResponse.json({ error: 'Influencer not found' }, { status: 404 })
    }

    return NextResponse.json(influencer)
  } catch (error) {
    console.error('Error fetching influencer:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/influencers/[id] - Update influencer
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    } = body

    const influencer = await prisma.influencer.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!influencer) {
      return NextResponse.json({ error: 'Influencer not found' }, { status: 404 })
    }

    const updatedInfluencer = await prisma.influencer.update({
      where: { id: params.id },
      data: {
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

    return NextResponse.json(updatedInfluencer)
  } catch (error) {
    console.error('Error updating influencer:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ 
        error: 'Influencer with this username and platform already exists' 
      }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/influencers/[id] - Delete influencer
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const influencer = await prisma.influencer.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!influencer) {
      return NextResponse.json({ error: 'Influencer not found' }, { status: 404 })
    }

    await prisma.influencer.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Influencer deleted successfully' })
  } catch (error) {
    console.error('Error deleting influencer:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
