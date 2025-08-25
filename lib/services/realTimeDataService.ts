import { prisma } from '@/lib/prisma'

export class RealTimeDataService {
  static async updateInfluencerData(userId: string) {
    try {
      // Get all influencers for the user
      const influencers = await prisma.influencer.findMany({
        where: { userId },
        select: {
          id: true,
          username: true,
          platform: true,
          profileUrl: true
        }
      })

      console.log(`Updating data for ${influencers.length} influencers`)

      // Update each influencer's data
      for (const influencer of influencers) {
        await this.updateSingleInfluencerData(influencer)
      }

      return { success: true, updatedCount: influencers.length }
    } catch (error) {
      console.error('Error updating influencer data:', error)
      throw error
    }
  }

  static async updateSingleInfluencerData(influencer: any) {
    try {
      // Simulate real-time data updates
      const mockData = this.generateMockRealTimeData(influencer.platform)
      
      // Update influencer data
      await prisma.influencer.update({
        where: { id: influencer.id },
        data: {
          followers: mockData.followers,
          engagement: mockData.engagement
        }
      })

      // Create a new post to simulate real-time content
      if (Math.random() > 0.7) { // 30% chance of new post
        await prisma.post.create({
          data: {
            influencerId: influencer.id,
            title: `New ${influencer.platform} post - ${new Date().toLocaleString()}`,
            content: `Real-time content from ${influencer.username}`,
            url: `https://${influencer.platform.toLowerCase()}.com/${influencer.username}`,
            platform: influencer.platform as any,
            postType: 'POST' as any,
            publishedAt: new Date(),
            likes: Math.floor(Math.random() * 1000) + 100,
            comments: Math.floor(Math.random() * 100) + 10,
            shares: Math.floor(Math.random() * 50) + 5,
            views: Math.floor(Math.random() * 10000) + 1000,
            reach: Math.floor(Math.random() * 15000) + 2000,
            impressions: Math.floor(Math.random() * 20000) + 3000,
            engagement: Math.random() * 10 + 1,
            tags: ['real-time', 'update'],
            mentions: [],
            hashtags: ['#realtime', '#update'],
            mediaUrls: []
          }
        })

        // Create activity for new post
        await prisma.activity.create({
          data: {
            userId: influencer.userId,
            influencerId: influencer.id,
            type: 'NEW_POST' as any,
            title: `@${influencer.username} posted new content`,
            description: `New post on ${influencer.platform}`,
            priority: 'MEDIUM' as any
          }
        })
      }

    } catch (error) {
      console.error(`Error updating influencer ${influencer.username}:`, error)
    }
  }

  static generateMockRealTimeData(platform: string) {
    const baseFollowers = {
      'INSTAGRAM': 50000,
      'YOUTUBE': 100000,
      'TIKTOK': 75000,
      'TWITTER_X': 30000,
      'LINKEDIN': 25000
    }

    const baseEngagement = {
      'INSTAGRAM': 4.2,
      'YOUTUBE': 6.8,
      'TIKTOK': 8.5,
      'TWITTER_X': 3.1,
      'LINKEDIN': 2.8
    }

    const platformKey = platform as keyof typeof baseFollowers
    const currentFollowers = baseFollowers[platformKey] || 50000
    const currentEngagement = baseEngagement[platformKey] || 4.0

    // Add some random variation to simulate real-time changes
    const followerChange = Math.floor(Math.random() * 100) - 50 // -50 to +50
    const engagementChange = (Math.random() - 0.5) * 2 // -1 to +1

    return {
      followers: Math.max(0, currentFollowers + followerChange),
      engagement: Math.max(0, currentEngagement + engagementChange)
    }
  }

  static async getRealTimeDashboardData(userId: string) {
    try {
      // First update all influencer data
      await this.updateInfluencerData(userId)

      // Then fetch updated dashboard data
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
            status: 'ACTIVE' as any
          },
          _count: { id: true }
        }),

        // Get post performance statistics (last 24 hours)
        prisma.post.aggregate({
          where: {
            influencer: { userId },
            publishedAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
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

        // Get recent activities (last 10)
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
          take: 10
        }),

        // Get next scheduled brief
        prisma.brief.findFirst({
          where: { userId },
          orderBy: { createdAt: 'desc' }
        })
      ])

      // Calculate real-time metrics
      const totalReach = postStats._sum.reach || 0
      const totalImpressions = postStats._sum.impressions || 0
      const avgEngagement = influencerStats._avg.engagement || 0
      const estimatedValue = (totalReach * 0.01) + (totalImpressions * avgEngagement * 0.05)

      const postCount = postStats._count.id || 1

      return {
        stats: {
          totalInfluencers: influencerStats._count.id,
          activeCampaigns: campaignStats._count.id,
          avgEngagement: parseFloat(avgEngagement.toFixed(1)),
          nextBrief: nextBrief?.createdAt.toISOString() || null
        },
        performance: {
          totalReach,
          totalImpressions,
          estimatedValue: parseFloat(estimatedValue.toFixed(0)),
          avgLikes: Math.round((postStats._sum.likes || 0) / postCount),
          avgComments: Math.round((postStats._sum.comments || 0) / postCount),
          avgShares: Math.round((postStats._sum.shares || 0) / postCount),
          avgViews: Math.round((postStats._sum.views || 0) / postCount)
        },
        recentActivities: recentActivities.map(activity => ({
          id: activity.id,
          title: activity.title,
          description: activity.description,
          type: activity.type,
          createdAt: activity.createdAt,
          influencer: activity.influencer
        })),
        lastUpdated: new Date().toISOString()
      }

    } catch (error) {
      console.error('Error getting real-time dashboard data:', error)
      throw error
    }
  }
}
