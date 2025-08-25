import { NextRequest, NextResponse } from 'next/server'
import { DemoDataService } from '@/lib/services/demoDataService'

export async function GET(request: NextRequest) {
  try {
    const data = DemoDataService.getAnalyticsData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Demo Social Media API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch demo data' },
      { status: 500 }
    )
  }
}


