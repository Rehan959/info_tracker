import { NextRequest, NextResponse } from 'next/server'
import { SocialMediaService } from '@/lib/services/socialMediaService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, username, platform } = body

    if (!url && !(username && platform)) {
      return NextResponse.json(
        { error: 'Provide either url or username+platform' },
        { status: 400 }
      )
    }

    const lookup = url || `${platform}:${username}`
    const profileData: any = await SocialMediaService.getProfileFromLinkScrapeFirst(lookup)

    if (!profileData) {
      return NextResponse.json(
        { error: 'Profile not found or unsupported URL' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      profile: profileData
    })

  } catch (error: any) {
    console.error('Fetch Profile API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch profile data' },
      { status: 500 }
    )
  }
}
