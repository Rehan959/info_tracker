import { PrismaClient, Platform, ActivityType, CampaignStatus, PostType, Sentiment } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create a test user
  const user = await prisma.user.upsert({
    where: { clerkId: 'test_user_123' },
    update: {},
    create: {
      clerkId: 'test_user_123',
      email: 'test@example.com',
      name: 'Test User'
    }
  })

  // Also create a user for the current Clerk session (you can replace this with your actual Clerk ID)
  const currentUser = await prisma.user.upsert({
    where: { clerkId: 'user_31hFQep8Kb4jk2wNqlZDXB6F2Mn' },
    update: {},
    create: {
      clerkId: 'user_31hFQep8Kb4jk2wNqlZDXB6F2Mn',
      email: 'your-account@example.com',
      name: 'Your Account'
    }
  })

  console.log('✅ Created test user:', user.email)
  console.log('✅ Created current user:', currentUser.email)
  console.log('🔑 Use this Clerk ID to test:', 'user_31hFQep8Kb4jk2wNqlZDXB6F2Mn')

  // Create sample influencers
  const influencers = await Promise.all([
    prisma.influencer.create({
      data: {
        userId: user.id,
        name: 'Sarah Johnson',
        username: 'sarahmarketing_linkedin',
        platform: Platform.LINKEDIN,
        followers: 125000,
        engagement: 4.8,
        bio: 'Digital Marketing Expert | Content Creator | Speaker',
        category: 'Marketing',
        isVerified: true
      }
    }),
    prisma.influencer.create({
      data: {
        userId: user.id,
        name: 'TechCrunch',
        username: 'techcrunch_youtube',
        platform: Platform.YOUTUBE,
        followers: 4500000,
        engagement: 3.2,
        bio: 'Latest technology news and analysis',
        category: 'Technology',
        isVerified: true
      }
    }),
    prisma.influencer.create({
      data: {
        userId: user.id,
        name: 'John Doe',
        username: 'johndoe_instagram',
        platform: Platform.INSTAGRAM,
        followers: 89000,
        engagement: 6.1,
        bio: 'Travel & Lifestyle Content Creator',
        category: 'Lifestyle',
        isVerified: false
      }
    }),
    prisma.influencer.create({
      data: {
        userId: user.id,
        name: 'Emma Wilson',
        username: 'emmawilson_tiktok',
        platform: Platform.TIKTOK,
        followers: 320000,
        engagement: 8.5,
        bio: 'Fashion & Beauty Influencer',
        category: 'Fashion',
        isVerified: true
      }
    })
  ])

  console.log('✅ Created', influencers.length, 'influencers')

  // Create sample influencers for current user
  const currentUserInfluencers = await Promise.all([
    prisma.influencer.create({
      data: {
        userId: currentUser.id,
        name: 'Cristiano Ronaldo',
        username: 'cristiano_instagram',
        platform: Platform.INSTAGRAM,
        followers: 650000000,
        engagement: 8.2,
        bio: 'Professional Footballer | CR7 Brand',
        category: 'Sports',
        isVerified: true
      }
    }),
    prisma.influencer.create({
      data: {
        userId: currentUser.id,
        name: 'Elon Musk',
        username: 'elonmusk_twitter',
        platform: Platform.TWITTER_X,
        followers: 180000000,
        engagement: 12.5,
        bio: 'CEO of Tesla and SpaceX',
        category: 'Technology',
        isVerified: true
      }
    })
  ])

  console.log('✅ Created', currentUserInfluencers.length, 'influencers for current user')

  // Create sample campaigns
  const campaigns = await Promise.all([
    prisma.campaign.create({
      data: {
        userId: user.id,
        name: 'Summer Fashion Collection',
        description: 'Promoting our new summer fashion line',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-08-31'),
        budget: 15000,
        status: CampaignStatus.ACTIVE,
        goals: ['Brand Awareness', 'Sales Conversion', 'Social Media Growth']
      }
    }),
    prisma.campaign.create({
      data: {
        userId: user.id,
        name: 'Tech Product Launch',
        description: 'Launch campaign for new tech product',
        startDate: new Date('2024-07-01'),
        endDate: new Date('2024-09-30'),
        budget: 25000,
        status: CampaignStatus.ACTIVE,
        goals: ['Product Launch', 'Market Penetration', 'User Acquisition']
      }
    }),
    prisma.campaign.create({
      data: {
        userId: user.id,
        name: 'Holiday Marketing',
        description: 'Holiday season marketing campaign',
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-31'),
        budget: 20000,
        status: CampaignStatus.DRAFT,
        goals: ['Seasonal Sales', 'Customer Retention', 'Brand Loyalty']
      }
    })
  ])

  console.log('✅ Created', campaigns.length, 'campaigns')

  // Link influencers to campaigns
  await Promise.all([
    prisma.campaignInfluencer.create({
      data: {
        campaignId: campaigns[0].id,
        influencerId: influencers[3].id, // Emma Wilson for fashion
        status: 'ACCEPTED',
        rate: 5000
      }
    }),
    prisma.campaignInfluencer.create({
      data: {
        campaignId: campaigns[1].id,
        influencerId: influencers[1].id, // TechCrunch for tech
        status: 'ACCEPTED',
        rate: 8000
      }
    }),
    prisma.campaignInfluencer.create({
      data: {
        campaignId: campaigns[0].id,
        influencerId: influencers[2].id, // John Doe for fashion
        status: 'IN_PROGRESS',
        rate: 3000
      }
    })
  ])

  console.log('✅ Linked influencers to campaigns')

  // Create sample posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        influencerId: influencers[0].id, // Sarah Johnson
        campaignId: null,
        title: 'Digital Marketing Trends 2024',
        content: 'The future of digital marketing is here! Here are the top trends...',
        url: 'https://linkedin.com/posts/sarahmarketing',
        platform: Platform.LINKEDIN,
        postType: PostType.ARTICLE,
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 1250,
        comments: 89,
        shares: 45,
        views: 8500,
        reach: 15000,
        impressions: 18000,
        engagement: 4.8,
        sentiment: Sentiment.POSITIVE,
        tags: ['Digital Marketing', 'Trends', '2024'],
        hashtags: ['#DigitalMarketing', '#MarketingTrends', '#2024'],
        mentions: [],
        mediaUrls: []
      }
    }),
    prisma.post.create({
      data: {
        influencerId: influencers[1].id, // TechCrunch
        campaignId: campaigns[1].id,
        title: 'New AI Technology Revolution',
        content: 'Breaking: Revolutionary AI technology that will change everything...',
        url: 'https://youtube.com/watch?v=techvideo',
        platform: Platform.YOUTUBE,
        postType: PostType.VIDEO,
        publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        likes: 45000,
        comments: 2300,
        shares: 1200,
        views: 250000,
        reach: 500000,
        impressions: 600000,
        engagement: 3.2,
        sentiment: Sentiment.POSITIVE,
        tags: ['AI', 'Technology', 'Revolution'],
        hashtags: ['#AI', '#Technology', '#Revolution'],
        mentions: [],
        mediaUrls: ['https://example.com/video1.mp4']
      }
    }),
    prisma.post.create({
      data: {
        influencerId: influencers[2].id, // John Doe
        campaignId: campaigns[0].id,
        title: 'Travel Adventures in Bali',
        content: 'Exploring the beautiful beaches and culture of Bali...',
        url: 'https://instagram.com/p/travelpost',
        platform: Platform.INSTAGRAM,
        postType: PostType.POST,
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        likes: 3200,
        comments: 156,
        shares: 89,
        views: 0,
        reach: 12000,
        impressions: 15000,
        engagement: 6.1,
        sentiment: Sentiment.POSITIVE,
        tags: ['Travel', 'Bali', 'Adventure'],
        hashtags: ['#Travel', '#Bali', '#Adventure'],
        mentions: [],
        mediaUrls: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg']
      }
    })
  ])

  console.log('✅ Created', posts.length, 'posts')

  // Create sample activities
  const activities = await Promise.all([
    prisma.activity.create({
      data: {
        userId: user.id,
        influencerId: influencers[2].id,
        postId: posts[2].id,
        type: ActivityType.NEW_POST,
        title: '@johndoe posted new content',
        description: 'John Doe posted new content about travel in Bali',
        priority: 'MEDIUM'
      }
    }),
    prisma.activity.create({
      data: {
        userId: user.id,
        influencerId: influencers[0].id,
        type: ActivityType.ENGAGEMENT_MILESTONE,
        title: '@sarahmarketing hit 125K followers',
        description: 'Sarah Marketing reached 125K followers milestone',
        priority: 'HIGH'
      }
    }),
    prisma.activity.create({
      data: {
        userId: user.id,
        influencerId: influencers[1].id,
        postId: posts[1].id,
        type: ActivityType.BRAND_MENTION,
        title: '@techcrunch mentioned your brand',
        description: 'TechCrunch mentioned your brand in their latest video',
        priority: 'HIGH'
      }
    }),
    prisma.activity.create({
      data: {
        userId: user.id,
        influencerId: influencers[3].id,
        type: ActivityType.FOLLOWER_MILESTONE,
        title: '@emmawilson hit 320K followers',
        description: 'Emma Wilson reached 320K followers on TikTok',
        priority: 'MEDIUM'
      }
    })
  ])

  console.log('✅ Created', activities.length, 'activities')

  // Create sample briefs
  const briefs = await Promise.all([
    prisma.brief.create({
      data: {
        userId: user.id,
        title: 'Q3 Marketing Strategy Brief',
        content: 'Comprehensive analysis of Q3 marketing performance and Q4 strategy recommendations',
        summary: 'Q3 showed strong growth in engagement and reach. Q4 focus on holiday campaigns.',
        timeRange: 'Q3 2024',
        isGenerated: true
      }
    }),
    prisma.brief.create({
      data: {
        userId: user.id,
        title: 'Influencer Performance Report',
        content: 'Monthly performance analysis of all monitored influencers',
        summary: 'Emma Wilson shows highest engagement rate. Consider expanding TikTok presence.',
        timeRange: 'October 2024',
        isGenerated: true
      }
    })
  ])

  console.log('✅ Created', briefs.length, 'briefs')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
