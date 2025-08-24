import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { UserService } from '@/lib/services/userService'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Create or update user
    const user = await UserService.findOrCreateUser(
      userId,
      `user-${userId}@example.com`,
      'User'
    )

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        clerkId: user.clerkId,
        email: user.email,
        name: user.name
      }
    })

  } catch (error) {
    console.error('User sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    )
  }
}
