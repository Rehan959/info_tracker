import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// GET /api/dashboard - Get dashboard data
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get date range for analytics (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // Get all statistics in parallel
    const [
      totalInfluencers,
      activeCampaigns,
      recentPosts,
      recentActivities,
      performanceMetrics,
      topInfluencers
    ] = await Promise.all([
      // Total influencers
      prisma.influencer.count({
        where: { userId: user.id }
      }),

      // Active campaigns
      prisma.campaign.count({
        where: { 
          userId: user.id,
          status: 'ACTIVE'
        }
      }),

      // Recent posts (last 30 days)
      prisma.post.findMany({
        where: {
          influencer: { userId: user.id },
          publishedAt: { gte: thirtyDaysAgo }
        },
        include: {
          influencer: {
            select: {
              name: true,
              username: true,
              platform: true,
              avatar: true
            }
          }
        },
        orderBy: { publishedAt: 'desc' },
        take: 10
      }),

      // Recent activities
      prisma.activity.findMany({
        where: { userId: user.id },
        include: {
          influencer: {
            select: {
              name: true,
              username: true,
              platform: true,
              avatar: true
            }
          },
          campaign: {
            select: {
              name: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),

      // Performance metrics
      prisma.post.aggregate({
        where: {
          influencer: { userId: user.id },
          publishedAt: { gte: thirtyDaysAgo }
        },
        _avg: {
          engagement: true,
          likes: true,
          comments: true,
          shares: true,
          views: true
        },
        _sum: {
          reach: true,
          impressions: true
        }
      }),

      // Top performing influencers
      prisma.influencer.findMany({
        where: { userId: user.id },
        include: {
          _count: {
            select: {
              posts: true
            }
          },
          posts: {
            where: {
              publishedAt: { gte: thirtyDaysAgo }
            },
            _avg: {
              engagement: true
            }
          }
        },
        orderBy: { engagement: 'desc' },
        take: 5
      })
    ])

    // Calculate average engagement
    const avgEngagement = performanceMetrics._avg.engagement || 0

    // Calculate total reach and impressions
    const totalReach = performanceMetrics._sum.reach || 0
    const totalImpressions = performanceMetrics._sum.impressions || 0

    // Calculate estimated value (simple calculation)
    const estimatedValue = totalReach * 0.01 // $0.01 per reach

    // Get next brief time (mock data for now)
    const nextBrief = new Date()
    nextBrief.setHours(nextBrief.getHours() + 18)

    const dashboardData = {
      stats: {
        totalInfluencers,
        activeCampaigns,
        avgEngagement: parseFloat(avgEngagement.toFixed(1)),
        nextBrief: nextBrief.toISOString()
      },
      performance: {
        totalReach,
        totalImpressions,
        estimatedValue: parseFloat(estimatedValue.toFixed(0)),
        avgLikes: performanceMetrics._avg.likes || 0,
        avgComments: performanceMetrics._avg.comments || 0,
        avgShares: performanceMetrics._avg.shares || 0,
        avgViews: performanceMetrics._avg.views || 0
      },
      recentPosts,
      recentActivities,
      topInfluencers: topInfluencers.map(influencer => ({
        ...influencer,
        avgEngagement: influencer.posts.length > 0 
          ? parseFloat((influencer.posts[0]._avg.engagement || 0).toFixed(1))
          : 0
      }))
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
