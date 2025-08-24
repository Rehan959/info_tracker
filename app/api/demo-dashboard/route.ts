import { NextResponse } from 'next/server'
import { DashboardService } from '@/lib/services/dashboardService'

export async function GET() {
  try {
    // For demo purposes, we'll use the test user ID from our seed data
    const testUserId = 'test_user_123'
    
    // We need to get the actual user ID from the database
    const { prisma } = await import('@/lib/prisma')
    const user = await prisma.user.findUnique({
      where: { clerkId: testUserId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Demo user not found. Please run the seed script first.' },
        { status: 404 }
      )
    }

    const dashboardData = await DashboardService.getDashboardData(user.id)
    
    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error('Demo Dashboard API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch demo dashboard data' },
      { status: 500 }
    )
  }
}
