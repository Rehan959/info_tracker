import { prisma } from '@/lib/prisma'
import { Influencer, Platform, InfluencerStatus } from '@prisma/client'

export class InfluencerService {
  static async getInfluencersByUser(userId: string, filters?: {
    platform?: Platform
    status?: InfluencerStatus
    category?: string
    page?: number
    limit?: number
  }) {
    const { platform, status, category, page = 1, limit = 10 } = filters || {}
    const skip = (page - 1) * limit

    const where: any = { userId }

    if (platform) where.platform = platform
    if (status) where.status = status
    if (category) where.category = category

    const [influencers, total] = await Promise.all([
      prisma.influencer.findMany({
        where,
        include: {
          _count: {
            select: {
              posts: true,
              campaigns: true
            }
          },
          posts: {
            take: 5,
            orderBy: { publishedAt: 'desc' }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.influencer.count({ where })
    ])

    return {
      influencers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  static async getInfluencerById(id: string, userId: string) {
    return await prisma.influencer.findFirst({
      where: {
        id,
        userId
      },
      include: {
        posts: {
          orderBy: { publishedAt: 'desc' },
          take: 20
        },
        campaigns: {
          include: {
            campaign: true
          }
        },
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: {
            posts: true,
            campaigns: true,
            activities: true
          }
        }
      }
    })
  }

  static async createInfluencer(userId: string, data: {
    name: string
    username: string
    platform: Platform
    followers?: number
    engagement?: number
    bio?: string
    avatar?: string
    website?: string
    email?: string
    phone?: string
    location?: string
    category?: string
    status?: InfluencerStatus
  }) {
    return await prisma.influencer.create({
      data: {
        userId,
        ...data
      }
    })
  }

  static async updateInfluencer(id: string, userId: string, data: Partial<Influencer>) {
    // Verify ownership
    const influencer = await prisma.influencer.findFirst({
      where: { id, userId }
    })

    if (!influencer) {
      throw new Error('Influencer not found')
    }

    return await prisma.influencer.update({
      where: { id },
      data
    })
  }

  static async deleteInfluencer(id: string, userId: string) {
    // Verify ownership
    const influencer = await prisma.influencer.findFirst({
      where: { id, userId }
    })

    if (!influencer) {
      throw new Error('Influencer not found')
    }

    return await prisma.influencer.delete({
      where: { id }
    })
  }

  static async getInfluencerStats(id: string, userId: string) {
    const influencer = await prisma.influencer.findFirst({
      where: { id, userId },
      include: {
        posts: {
          orderBy: { publishedAt: 'desc' },
          take: 30
        }
      }
    })

    if (!influencer) return null

    const totalPosts = influencer.posts.length
    const totalLikes = influencer.posts.reduce((sum, post) => sum + post.likes, 0)
    const totalComments = influencer.posts.reduce((sum, post) => sum + post.comments, 0)
    const totalShares = influencer.posts.reduce((sum, post) => sum + post.shares, 0)
    const avgEngagement = totalPosts > 0 ? (totalLikes + totalComments + totalShares) / totalPosts / influencer.followers * 100 : 0

    return {
      totalPosts,
      totalLikes,
      totalComments,
      totalShares,
      avgEngagement: parseFloat(avgEngagement.toFixed(2)),
      engagementRate: influencer.engagement
    }
  }
}
