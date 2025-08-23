import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// GET /api/influencers - Get all influencers for current user
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const platform = searchParams.get('platform')
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where: any = {
      userId: user.id
    }

    if (platform) where.platform = platform
    if (status) where.status = status
    if (category) where.category = category

    const [influencers, total] = await Promise.all([
      prisma.influencer.findMany({
        where,
        include: {
          _count: {
            select: {
              posts: true,
              campaigns: true
            }
          },
          posts: {
            take: 5,
            orderBy: { publishedAt: 'desc' }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.influencer.count({ where })
    ])

    return NextResponse.json({
      influencers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching influencers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
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
