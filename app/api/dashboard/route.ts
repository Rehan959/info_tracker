import { NextRequest, NextResponse } from 'next/server'
import { RealTimeDataService } from '@/lib/services/realTimeDataService'
import { prisma } from '@/lib/prisma'
import { getUserIdFromRequest } from '@/lib/auth'
import { DemoDataService } from '@/lib/services/demoDataService'

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request)

    // Public fallback: serve demo data if unauthenticated
    if (!userId) {
      const demo = DemoDataService.getDashboardData()
      return NextResponse.json(demo)
    }

    // Ensure user exists in database (by internal id)
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: `user-${userId}@example.com`,
        name: 'Current User'
      }
    })

    console.log('Getting real-time dashboard data for user:', user.id)

    // Get real-time dashboard data
    const dashboardData = await RealTimeDataService.getRealTimeDashboardData(user.id)
    
    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error('Dashboard API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
