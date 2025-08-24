import { prisma } from '@/lib/prisma'
import { Platform, ActivityType, CampaignStatus } from '@prisma/client'

export interface DashboardStats {
  totalInfluencers: number
  activeCampaigns: number
  avgEngagement: number
  nextBrief: string | null
}

export interface DashboardPerformance {
  totalReach: number
  totalImpressions: number
  estimatedValue: number
  avgLikes: number
  avgComments: number
  avgShares: number
  avgViews: number
}

export interface DashboardActivity {
  id: string
  title: string
  description: string | null
  type: ActivityType
  createdAt: Date
  influencer?: {
    name: string
    username: string
    platform: Platform
  } | null
}

export interface DashboardData {
  stats: DashboardStats
  performance: DashboardPerformance
  recentActivities: DashboardActivity[]
}

export class DashboardService {
  static async getDashboardData(userId: string): Promise<DashboardData> {
    const [
      influencerStats,
      campaignStats,
      postStats,
      recentActivities,
      nextBrief
    ] = await Promise.all([
      // Get influencer statistics
      prisma.influencer.aggregate({
        where: { userId },
        _count: { id: true },
        _avg: { engagement: true }
      }),

      // Get campaign statistics
      prisma.campaign.aggregate({
        where: { 
          userId,
          status: CampaignStatus.ACTIVE
        },
        _count: { id: true }
      }),

      // Get post performance statistics
      prisma.post.aggregate({
        where: {
          influencer: { userId }
        },
        _sum: {
          reach: true,
          impressions: true,
          likes: true,
          comments: true,
          shares: true,
          views: true
        },
        _count: { id: true }
      }),

      // Get recent activities
      prisma.activity.findMany({
        where: { userId },
        include: {
          influencer: {
            select: {
              name: true,
              username: true,
              platform: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),

      // Get next scheduled brief
      prisma.brief.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      })
    ])

    // Calculate estimated value (rough calculation based on reach and engagement)
    const totalReach = postStats._sum.reach || 0
    const totalImpressions = postStats._sum.impressions || 0
    const avgEngagement = influencerStats._avg.engagement || 0
    
    // Rough estimate: $0.01 per reach + $0.05 per engagement
    const estimatedValue = (totalReach * 0.01) + (totalImpressions * avgEngagement * 0.05)

    const stats: DashboardStats = {
      totalInfluencers: influencerStats._count.id,
      activeCampaigns: campaignStats._count.id,
      avgEngagement: parseFloat(avgEngagement.toFixed(1)),
      nextBrief: nextBrief?.createdAt.toISOString() || null
    }

    const postCount = postStats._count.id || 1 // Avoid division by zero
    const performance: DashboardPerformance = {
      totalReach,
      totalImpressions,
      estimatedValue: parseFloat(estimatedValue.toFixed(0)),
      avgLikes: Math.round((postStats._sum.likes || 0) / postCount),
      avgComments: Math.round((postStats._sum.comments || 0) / postCount),
      avgShares: Math.round((postStats._sum.shares || 0) / postCount),
      avgViews: Math.round((postStats._sum.views || 0) / postCount)
    }

    const activities: DashboardActivity[] = recentActivities.map(activity => ({
      id: activity.id,
      title: activity.title,
      description: activity.description,
      type: activity.type,
      createdAt: activity.createdAt,
      influencer: activity.influencer
    }))

    return {
      stats,
      performance,
      recentActivities: activities
    }
  }

  static async getInfluencerGrowth(userId: string, days: number = 30) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const influencers = await prisma.influencer.findMany({
      where: { 
        userId,
        createdAt: { gte: startDate }
      },
      select: {
        createdAt: true,
        followers: true
      },
      orderBy: { createdAt: 'asc' }
    })

    return influencers
  }

  static async getCampaignPerformance(userId: string) {
    const campaigns = await prisma.campaign.findMany({
      where: { userId },
      include: {
        influencers: {
          include: {
            influencer: {
              include: {
                posts: {
                  where: {
                    publishedAt: {
                      gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    return campaigns.map(campaign => {
      const totalReach = campaign.influencers.reduce((sum, ci) => 
        sum + ci.influencer.posts.reduce((postSum, post) => postSum + post.reach, 0), 0
      )
      
      return {
        id: campaign.id,
        name: campaign.name,
        totalReach,
        influencerCount: campaign.influencers.length,
        status: campaign.status
      }
    })
  }

  static async getTopInfluencers(userId: string, limit: number = 5) {
    return await prisma.influencer.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        username: true,
        platform: true,
        followers: true,
        engagement: true,
        _count: {
          select: {
            posts: true
          }
        }
      },
      orderBy: [
        { followers: 'desc' },
        { engagement: 'desc' }
      ],
      take: limit
    })
  }
}
