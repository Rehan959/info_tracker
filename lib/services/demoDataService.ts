export class DemoDataService {
  static getDashboardData() {
    return {
      stats: {
        totalInfluencers: 6,
        activeCampaigns: 3,
        avgEngagement: 4.8,
        nextBrief: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() // 2 hours from now
      },
      performance: {
        totalReach: 1250000,
        totalImpressions: 1800000,
        estimatedValue: 45000,
        avgLikes: 290,
        avgComments: 21,
        avgShares: 12,
        avgViews: 8013
      },
      recentActivities: [
        {
          id: '1',
          title: '@cristiano posted new content',
          description: 'Cristiano Ronaldo posted new content on Instagram',
          type: 'NEW_POST',
          createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
          influencer: {
            name: 'Cristiano Ronaldo',
            username: 'cristiano',
            platform: 'INSTAGRAM'
          }
        },
        {
          id: '2',
          title: '@elonmusk hit engagement milestone',
          description: 'Elon Musk reached 12.5% engagement rate',
          type: 'ENGAGEMENT_MILESTONE',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          influencer: {
            name: 'Elon Musk',
            username: 'elonmusk',
            platform: 'TWITTER_X'
          }
        },
        {
          id: '3',
          title: '@sarahmarketing mentioned your brand',
          description: 'Sarah Marketing mentioned your brand in latest post',
          type: 'BRAND_MENTION',
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
          influencer: {
            name: 'Sarah Johnson',
            username: 'sarahmarketing',
            platform: 'LINKEDIN'
          }
        }
      ]
    }
  }

  static getAnalyticsData() {
    return {
      timeSeries: this.generateTimeSeriesData(),
      platformBreakdown: [
        { platform: 'Instagram', posts: 45, engagement: 4.2 },
        { platform: 'YouTube', posts: 23, engagement: 6.8 },
        { platform: 'TikTok', posts: 38, engagement: 8.5 },
        { platform: 'Twitter', posts: 28, engagement: 3.1 },
        { platform: 'LinkedIn', posts: 22, engagement: 2.8 }
      ],
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
      topPosts: [
        {
          id: 'post_1',
          title: 'Amazing Instagram post about influencer marketing 1',
          platform: 'Instagram',
          likes: 1850,
          comments: 156,
          shares: 89,
          views: 45000,
          engagement: 4.6,
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'post_2',
          title: 'Viral TikTok content about social media trends',
          platform: 'TikTok',
          likes: 2200,
          comments: 234,
          shares: 156,
          views: 85000,
          engagement: 8.9,
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'post_3',
          title: 'Professional LinkedIn article about marketing',
          platform: 'LinkedIn',
          likes: 890,
          comments: 67,
          shares: 45,
          views: 25000,
          engagement: 2.8,
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
        }
      ]
    }
  }

  static getInfluencersData() {
    return [
      {
        id: '1',
        name: 'Cristiano Ronaldo',
        username: 'cristiano_instagram_current',
        platform: 'INSTAGRAM',
        followers: 650000000,
        engagement: 8.2,
        bio: 'Professional Footballer | CR7 Brand',
        category: 'Sports',
        status: 'ACTIVE',
        isVerified: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Elon Musk',
        username: 'elonmusk_twitter_current',
        platform: 'TWITTER_X',
        followers: 180000000,
        engagement: 12.5,
        bio: 'CEO of Tesla and SpaceX',
        category: 'Technology',
        status: 'ACTIVE',
        isVerified: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Sarah Johnson',
        username: 'sarahmarketing_linkedin',
        platform: 'LINKEDIN',
        followers: 125000,
        engagement: 4.8,
        bio: 'Digital Marketing Expert | Content Creator | Speaker',
        category: 'Marketing',
        status: 'ACTIVE',
        isVerified: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        name: 'TechCrunch',
        username: 'techcrunch_youtube',
        platform: 'YOUTUBE',
        followers: 4500000,
        engagement: 3.2,
        bio: 'Latest technology news and analysis',
        category: 'Technology',
        status: 'ACTIVE',
        isVerified: true,
        createdAt: new Date().toISOString()
      }
    ]
  }

  private static generateTimeSeriesData() {
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
}
