import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// GET /api/users - Get current user profile
export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        _count: {
          select: {
            campaigns: true,
            influencers: true,
            activities: true,
            briefs: true,
            automations: true,
            notifications: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/users - Create or update user profile
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { email, name } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (user) {
      // Update existing user
      user = await prisma.user.update({
        where: { clerkId: userId },
        data: { email, name }
      })
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email,
          name
        }
      })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating/updating user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
