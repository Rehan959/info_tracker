import { NextRequest, NextResponse } from 'next/server'
import { DemoDataService } from '@/lib/services/demoDataService'

export async function GET(request: NextRequest) {
  try {
    const data = DemoDataService.getInfluencersData()
    return NextResponse.json({
      success: true,
      influencers: data
    })
  } catch (error) {
    console.error('Demo Influencers API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch demo influencers data' },
      { status: 500 }
    )
  }
}
