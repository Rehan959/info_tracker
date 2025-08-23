import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export class UserService {
  static async findOrCreateUser(clerkId: string, email: string, name?: string): Promise<User> {
    let user = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId,
          email,
          name
        }
      })
    }

    return user
  }

  static async getUserById(clerkId: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { clerkId },
      include: {
        _count: {
          select: {
            campaigns: true,
            influencers: true,
            activities: true,
            briefs: true,
            automations: true,
            notifications: true
          }
        }
      }
    })
  }

  static async updateUser(clerkId: string, data: Partial<User>): Promise<User> {
    return await prisma.user.update({
      where: { clerkId },
      data
    })
  }

  static async getUserStats(clerkId: string) {
    const user = await this.getUserById(clerkId)
    if (!user) return null

    const [
      totalInfluencers,
      activeCampaigns,
      totalPosts,
      totalActivities
    ] = await Promise.all([
      prisma.influencer.count({ where: { userId: user.id } }),
      prisma.campaign.count({ where: { userId: user.id, status: 'ACTIVE' } }),
      prisma.post.count({ 
        where: { influencer: { userId: user.id } } 
      }),
      prisma.activity.count({ where: { userId: user.id } })
    ])

    return {
      totalInfluencers,
      activeCampaigns,
      totalPosts,
      totalActivities
    }
  }
}
