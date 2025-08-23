import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create a sample user
  const user = await prisma.user.upsert({
    where: { email: 'demo@influencetracker.com' },
    update: {},
    create: {
      email: 'demo@influencetracker.com',
      name: 'Demo User',
      clerkId: 'demo_user_123'
    }
  })

  console.log('✅ Created demo user:', user.email)

  // Create sample influencers
  const influencers = await Promise.all([
    prisma.influencer.create({
      data: {
        userId: user.id,
        name: 'John Doe',
        username: 'johndoe',
        platform: 'INSTAGRAM',
        followers: 125000,
        engagement: 4.2,
        bio: 'Lifestyle and travel content creator',
        category: 'Lifestyle',
        status: 'ACTIVE'
      }
    }),
    prisma.influencer.create({
      data: {
        userId: user.id,
        name: 'Sarah Marketing',
        username: 'sarahmarketing',
        platform: 'LINKEDIN',
        followers: 89000,
        engagement: 3.8,
        bio: 'Digital marketing expert and consultant',
        category: 'Business',
        status: 'ACTIVE'
      }
    }),
    prisma.influencer.create({
      data: {
        userId: user.id,
        name: 'Tech Review Pro',
        username: 'techreviewpro',
        platform: 'YOUTUBE',
        followers: 250000,
        engagement: 5.1,
        bio: 'Tech reviews and tutorials',
        category: 'Technology',
        status: 'ACTIVE'
      }
    })
  ])

  console.log('✅ Created', influencers.length, 'influencers')

  // Create sample campaigns
  const campaigns = await Promise.all([
    prisma.campaign.create({
      data: {
        userId: user.id,
        name: 'Summer Product Launch',
        description: 'Launch campaign for new summer collection',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-08-31'),
        budget: 50000,
        status: 'ACTIVE',
        goals: ['Brand Awareness', 'Sales', 'Engagement']
      }
    }),
    prisma.campaign.create({
      data: {
        userId: user.id,
        name: 'Holiday Season',
        description: 'Holiday marketing campaign',
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-31'),
        budget: 75000,
        status: 'DRAFT',
        goals: ['Sales', 'Brand Awareness']
      }
    })
  ])

  console.log('✅ Created', campaigns.length, 'campaigns')

  // Create sample posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        influencerId: influencers[0].id,
        title: 'Amazing travel destination!',
        content: 'Just discovered this incredible place. You have to visit! #travel #adventure',
        url: 'https://instagram.com/p/sample1',
        platform: 'INSTAGRAM',
        postType: 'POST',
        publishedAt: new Date('2024-01-15T10:00:00Z'),
        likes: 1250,
        comments: 89,
        shares: 45,
        views: 8500,
        engagement: 4.2,
        reach: 12000,
        impressions: 15000,
        sentiment: 'POSITIVE',
        tags: ['travel', 'adventure', 'lifestyle'],
        mentions: ['@brand'],
        hashtags: ['#travel', '#adventure', '#lifestyle'],
        mediaUrls: ['https://example.com/image1.jpg']
      }
    }),
    prisma.post.create({
      data: {
        influencerId: influencers[1].id,
        title: 'Marketing tips for 2024',
        content: 'Here are my top marketing strategies for this year. What do you think?',
        url: 'https://linkedin.com/posts/sample2',
        platform: 'LINKEDIN',
        postType: 'POST',
        publishedAt: new Date('2024-01-14T14:30:00Z'),
        likes: 890,
        comments: 156,
        shares: 234,
        views: 12000,
        engagement: 3.8,
        reach: 15000,
        impressions: 18000,
        sentiment: 'POSITIVE',
        tags: ['marketing', 'business', 'strategy'],
        mentions: [],
        hashtags: ['#marketing', '#business', '#strategy'],
        mediaUrls: []
      }
    })
  ])

  console.log('✅ Created', posts.length, 'posts')

  // Create sample activities
  const activities = await Promise.all([
    prisma.activity.create({
      data: {
        userId: user.id,
        influencerId: influencers[0].id,
        type: 'NEW_POST',
        title: 'New post from @johndoe',
        description: 'John Doe posted new content about travel',
        priority: 'MEDIUM',
        data: {
          postId: posts[0].id,
          platform: 'INSTAGRAM'
        }
      }
    }),
    prisma.activity.create({
      data: {
        userId: user.id,
        influencerId: influencers[1].id,
        type: 'ENGAGEMENT_MILESTONE',
        title: 'Engagement milestone reached',
        description: 'Sarah Marketing reached 100K followers',
        priority: 'HIGH',
        data: {
          milestone: '100K followers',
          platform: 'LINKEDIN'
        }
      }
    })
  ])

  console.log('✅ Created', activities.length, 'activities')

  // Create sample briefs
  const briefs = await Promise.all([
    prisma.brief.create({
      data: {
        userId: user.id,
        title: 'Weekly Trend Report',
        content: 'This week\'s influencer marketing trends and insights...',
        summary: 'Key trends in influencer marketing for the past week',
        timeRange: '7d',
        isGenerated: true,
        data: {
          totalContent: 156,
          avgEngagement: '4.2%',
          topTrends: ['sustainability', 'authenticity', 'short-form content']
        }
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
