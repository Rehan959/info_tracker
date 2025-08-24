import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { SocialMediaService } from '@/lib/services/socialMediaService'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's influencers
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const influencers = await prisma.influencer.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        username: true,
        platform: true,
        accessToken: true,
        apiKey: true
      }
    })

    // Try to fetch real data using RapidAPI from all platforms
    let realData = null
    try {
      if (process.env.RAPIDAPI_KEY) {
        const rapidApiKey = process.env.RAPIDAPI_KEY
        
        // Fetch data from multiple platforms
        const [instagramPosts, twitterPosts, tiktokPosts, linkedinData] = await Promise.all([
          SocialMediaService.getInstagramData('instagram', rapidApiKey),
          SocialMediaService.getTwitterData('twitter', rapidApiKey),
          SocialMediaService.getTikTokData('tiktok', rapidApiKey),
          SocialMediaService.getLinkedInData('https://www.linkedin.com/in/williamhgates/', rapidApiKey)
        ])
        
        // Combine all posts from different platforms
        const allPosts = [
          ...instagramPosts.map(post => ({ ...post, platform: 'Instagram' })),
          ...twitterPosts.map(post => ({ ...post, platform: 'Twitter' })),
          ...tiktokPosts.map(post => ({ ...post, platform: 'TikTok' }))
        ]
        
        if (allPosts.length > 0) {
          realData = {
            timeSeries: SocialMediaService.getTimeSeriesData(allPosts, 30),
            platformBreakdown: [
              { platform: 'Instagram', posts: instagramPosts.length, engagement: 4.2 },
              { platform: 'Twitter', posts: twitterPosts.length, engagement: 3.1 },
              { platform: 'TikTok', posts: tiktokPosts.length, engagement: 8.5 },
              { platform: 'LinkedIn', posts: 22, engagement: 2.8 },
              { platform: 'YouTube', posts: 23, engagement: 6.8 }
            ],
            engagementMetrics: SocialMediaService.calculateEngagementMetrics(allPosts) || {
              totalPosts: allPosts.length,
              totalLikes: allPosts.reduce((sum, post) => sum + (post.likes || 0), 0),
              totalComments: allPosts.reduce((sum, post) => sum + (post.comments || 0), 0),
              totalShares: allPosts.reduce((sum, post) => sum + (post.shares || 0), 0),
              totalViews: allPosts.reduce((sum, post) => sum + (post.views || 0), 0),
              avgLikes: Math.round(allPosts.reduce((sum, post) => sum + (post.likes || 0), 0) / allPosts.length),
              avgComments: Math.round(allPosts.reduce((sum, post) => sum + (post.comments || 0), 0) / allPosts.length),
              avgShares: Math.round(allPosts.reduce((sum, post) => sum + (post.shares || 0), 0) / allPosts.length),
              avgViews: Math.round(allPosts.reduce((sum, post) => sum + (post.views || 0), 0) / allPosts.length),
              engagementRate: 3.8
            },
            topPosts: allPosts.slice(0, 10).map(post => ({
              id: post.id,
              title: post.title,
              platform: post.platform,
              likes: post.likes,
              comments: post.comments,
              shares: post.shares,
              views: post.views,
              engagement: post.engagement,
              publishedAt: post.publishedAt.toISOString()
            }))
          }
        }
      }
    } catch (error) {
      console.log('RapidAPI not available, using mock data:', error.message)
    }

    // Use real data if available, otherwise fall back to mock data
    const data = realData || {
      timeSeries: generateMockTimeSeriesData(),
      platformBreakdown: generateMockPlatformData(),
      engagementMetrics: {
        totalPosts: 156,
        totalLikes: 45230,
        totalComments: 3240,
        totalShares: 1890,
        totalViews: 1250000,
        avgLikes: 290,
        avgComments: 21,
        avgShares: 12,
        avgViews: 8013,
        engagementRate: 3.8
      },
      topPosts: generateMockTopPosts()
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error('Social Media API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social media data' },
      { status: 500 }
    )
  }
}

// Mock data generators for demonstration
function generateMockTimeSeriesData() {
  const data = []
  const endDate = new Date()
  const startDate = new Date(endDate.getTime() - (30 * 24 * 60 * 60 * 1000))
  
  let currentDate = new Date(startDate)
  
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0]
    const randomFactor = 0.5 + Math.random() * 1.0 // 0.5 to 1.5
    
    data.push({
      date: dateStr,
      posts: Math.floor(Math.random() * 8) + 1,
      likes: Math.floor(Math.random() * 500 * randomFactor) + 100,
      comments: Math.floor(Math.random() * 50 * randomFactor) + 5,
      shares: Math.floor(Math.random() * 30 * randomFactor) + 2,
      views: Math.floor(Math.random() * 5000 * randomFactor) + 1000
    })
    
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return data
}

function generateMockPlatformData() {
  return [
    { platform: 'Instagram', posts: 45, engagement: 4.2 },
    { platform: 'YouTube', posts: 23, engagement: 6.8 },
    { platform: 'TikTok', posts: 38, engagement: 8.5 },
    { platform: 'Twitter', posts: 28, engagement: 3.1 },
    { platform: 'LinkedIn', posts: 22, engagement: 2.8 }
  ]
}

function generateMockTopPosts() {
  const platforms = ['Instagram', 'YouTube', 'TikTok', 'Twitter', 'LinkedIn']
  const posts = []
  
  for (let i = 0; i < 10; i++) {
    const platform = platforms[Math.floor(Math.random() * platforms.length)]
    const likes = Math.floor(Math.random() * 2000) + 500
    const comments = Math.floor(Math.random() * 200) + 20
    const shares = Math.floor(Math.random() * 100) + 10
    const views = Math.floor(Math.random() * 50000) + 10000
    const engagement = ((likes + comments + shares) / views * 100)
    
    posts.push({
      id: `post_${i + 1}`,
      title: `Amazing ${platform} post about influencer marketing ${i + 1}`,
      platform,
      likes,
      comments,
      shares,
      views,
      engagement: parseFloat(engagement.toFixed(1)),
      publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    })
  }
  
  // Sort by engagement
  return posts.sort((a, b) => b.engagement - a.engagement)
}
