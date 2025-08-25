import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SocialMediaService } from '@/lib/services/socialMediaService'
import { parseFollowerCount } from '@/lib/utils'

async function fetchLatestFollowers(platform: string, username: string, rapidApiKey: string) {
  const p = (platform || '').toUpperCase()
  try {
    switch (p) {
      case 'INSTAGRAM': {
        const profile = await SocialMediaService.getInstagramProfile(username, rapidApiKey)
        return profile?.followers ?? (await SocialMediaService.scrapeInstagramFollowers(username))
      }
      case 'TWITTER_X': {
        const profile = await SocialMediaService.getTwitterProfile(username, rapidApiKey)
        return profile?.followers ?? (await SocialMediaService.scrapeTwitterFollowers(username))
      }
      case 'YOUTUBE': {
        const profile = await SocialMediaService.getYouTubeProfile(username, rapidApiKey)
        return profile?.followers ?? (await SocialMediaService.scrapeYouTubeFollowers(username))
      }
      case 'LINKEDIN': {
        const url = `https://www.linkedin.com/in/${username}/`
        const profile = await SocialMediaService.getLinkedInProfile(url, rapidApiKey)
        return profile?.followers ?? (await SocialMediaService.scrapeLinkedInFollowers(username))
      }
      default:
        return null
    }
  } catch {
    // Try scrape-only fallback
    switch (p) {
      case 'INSTAGRAM': return SocialMediaService.scrapeInstagramFollowers(username)
      case 'TWITTER_X': return SocialMediaService.scrapeTwitterFollowers(username)
      case 'YOUTUBE': return SocialMediaService.scrapeYouTubeFollowers(username)
      case 'LINKEDIN': return SocialMediaService.scrapeLinkedInFollowers(username)
      default: return null
    }
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const influencer = await prisma.influencer.findUnique({ where: { id } })
    if (!influencer) {
      return NextResponse.json({ error: 'Influencer not found' }, { status: 404 })
    }

    const rapidApiKey = process.env.RAPIDAPI_KEY || ''
    const latest = await fetchLatestFollowers(String(influencer.platform), influencer.username, rapidApiKey)
    if (latest == null) {
      return NextResponse.json({ error: 'Unable to fetch latest followers' }, { status: 502 })
    }

    const followers = parseFollowerCount(latest)
    const updated = await prisma.influencer.update({
      where: { id },
      data: { followers }
    })

    return NextResponse.json({ success: true, influencer: updated })
  } catch (error) {
    console.error('Refresh followers error:', error)
    return NextResponse.json({ error: 'Failed to refresh followers' }, { status: 500 })
  }
}
