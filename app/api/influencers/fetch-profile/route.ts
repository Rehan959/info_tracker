import { NextRequest, NextResponse } from 'next/server'
import { SocialMediaService } from '@/lib/services/socialMediaService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Get RapidAPI key from environment
    const rapidApiKey = process.env.RAPIDAPI_KEY
    if (!rapidApiKey) {
      return NextResponse.json(
        { error: 'RapidAPI key not configured' },
        { status: 500 }
      )
    }

    // Fetch profile data using the social media service
    const profileData = await SocialMediaService.getProfileFromLink(url, rapidApiKey)
    
    return NextResponse.json({
      success: true,
      profile: profileData
    })

  } catch (error) {
    console.error('Fetch Profile API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch profile data' },
      { status: 500 }
    )
  }
}
