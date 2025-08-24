import { prisma } from '@/lib/prisma'

export class UserService {
  static async findOrCreateUser(clerkId: string, email: string, name?: string) {
    try {
      const user = await prisma.user.upsert({
        where: { clerkId },
        update: {
          email,
          name: name || null,
          updatedAt: new Date()
        },
        create: {
          clerkId,
          email,
          name: name || null
        }
      })

      return user
    } catch (error) {
      console.error('Error in findOrCreateUser:', error)
      throw error
    }
  }

  static async getUserByClerkId(clerkId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { clerkId }
      })

      if (!user) {
        // Try to create user if not found
        console.log(`User not found, attempting to create: ${clerkId}`)
        return null
      }

      return user
    } catch (error) {
      console.error('Error in getUserByClerkId:', error)
      throw error
    }
  }

  static async syncUserFromClerk(clerkId: string, email: string, name?: string) {
    try {
      const user = await this.findOrCreateUser(clerkId, email, name)
      console.log(`✅ User synced successfully: ${email} (${clerkId})`)
      return user
    } catch (error) {
      console.error('Error syncing user from Clerk:', error)
      throw error
    }
  }
}
