import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserIdFromRequest } from '@/lib/auth'

// GET /api/influencers/[id] - Get specific influencer
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserIdFromRequest(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })

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
    const userId = getUserIdFromRequest(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserIdFromRequest(request)
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params

    // Get user from database
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if influencer belongs to this user
    const influencer = await prisma.influencer.findFirst({
      where: {
        id: id,
        userId: user.id
      }
    })

    if (!influencer) {
      return NextResponse.json(
        { error: 'Influencer not found' },
        { status: 404 }
      )
    }

    // Delete the influencer
    await prisma.influencer.delete({
      where: { id: id }
    })

    return NextResponse.json({
      success: true,
      message: 'Influencer deleted successfully'
    })

  } catch (error) {
    console.error('Delete Influencer API Error:', error)
    return NextResponse.json(
      { error: 'Failed to delete influencer' },
      { status: 500 }
    )
  }
}
