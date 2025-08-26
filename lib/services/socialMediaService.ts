import { Platform } from '@prisma/client'
import { 
  findCelebrity, 
  getCelebritiesByPlatform, 
  searchCelebrities as searchCelebritiesDB, 
  celebrityDatabase,
  CelebrityProfile 
} from '../../components/celebrityData'

// Updated to use Python scraper API instead of paid APIs
export class SocialMediaService {
  private static PYTHON_API_URL = process.env.PYTHON_SCRAPER_URL || 'http://localhost:8000'

  // New method: Call Python scraper API
  private static async callPythonScraper(url: string) {
    try {
      const response = await fetch(`${this.PYTHON_API_URL}/api/scrape`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`Python API error: ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Python scraper API call failed:', error)
      return null
    }
  }

  // Helper method to convert celebrity data to profile format
  private static convertCelebrityToProfile(celebrity: CelebrityProfile, platform: Platform) {
    return {
      name: celebrity.name,
      username: celebrity.username,
      platform: platform,
      followers: celebrity.followers,
      following: null, // Most platforms don't show following count publicly
      posts: celebrity.posts,
      bio: celebrity.bio,
      profileUrl: celebrity.profileUrl,
      isPrivate: false,
      isVerified: celebrity.isVerified,
      profilePicture: ''
    }
  }

  // Instagram profile
  static async getInstagramProfile(username: string) {
    try {
      const url = `https://instagram.com/${username}`
      const result = await this.callPythonScraper(url)
      
      if (result?.success && result.data) {
        return {
          name: result.data.username,
          username: result.data.username,
          platform: 'INSTAGRAM' as Platform,
          followers: result.data.followers,
          following: result.data.following,
          posts: result.data.posts,
          bio: result.data.bio,
          profileUrl: result.data.profile_url,
          isPrivate: result.data.is_private,
          isVerified: result.data.is_verified,
          profilePicture: result.data.profile_picture
        }
      }

      // Try to find in celebrity database as fallback
      const celebrity = findCelebrity(username, 'INSTAGRAM')
      if (celebrity) {
        console.log(`Found Instagram celebrity data for ${username}: ${celebrity.name}`)
        return this.convertCelebrityToProfile(celebrity, 'INSTAGRAM')
      }

      // Final fallback with minimal data
      return {
        name: username,
        username: username,
        platform: 'INSTAGRAM' as Platform,
        followers: null,
        following: null,
        posts: null,
        bio: '',
        profileUrl: url,
        isPrivate: false,
        isVerified: false,
        profilePicture: ''
      }
    } catch (error) {
      console.error('Instagram profile fetch failed:', error)
      
      // Try celebrity database as last resort
      const celebrity = findCelebrity(username, 'INSTAGRAM')
      if (celebrity) {
        console.log(`Found Instagram celebrity data for ${username} after error: ${celebrity.name}`)
        return this.convertCelebrityToProfile(celebrity, 'INSTAGRAM')
      }
      
      return null
    }
  }

  // Twitter profile
  static async getTwitterProfile(username: string) {
    try {
      const url = `https://twitter.com/${username}`
      const result = await this.callPythonScraper(url)
      
      if (result?.success && result.data) {
        return {
          name: result.data.username,
          username: result.data.username,
          platform: 'TWITTER_X' as Platform,
          followers: result.data.followers,
          following: result.data.following,
          posts: result.data.posts,
          bio: result.data.bio,
          profileUrl: result.data.profile_url,
          isPrivate: result.data.is_private,
          isVerified: result.data.is_verified,
          profilePicture: result.data.profile_picture
        }
      }

      // Try to find in celebrity database as fallback
      const celebrity = findCelebrity(username, 'TWITTER')
      if (celebrity) {
        console.log(`Found Twitter celebrity data for ${username}: ${celebrity.name}`)
        return this.convertCelebrityToProfile(celebrity, 'TWITTER_X')
      }

      // Final fallback with minimal data
      return {
        name: username,
        username: username,
        platform: 'TWITTER_X' as Platform,
        followers: null,
        following: null,
        posts: null,
        bio: '',
        profileUrl: url,
        isPrivate: false,
        isVerified: false,
        profilePicture: ''
      }
    } catch (error) {
      console.error('Twitter profile fetch failed:', error)
      
      // Try celebrity database as last resort
      const celebrity = findCelebrity(username, 'TWITTER')
      if (celebrity) {
        console.log(`Found Twitter celebrity data for ${username} after error: ${celebrity.name}`)
        return this.convertCelebrityToProfile(celebrity, 'TWITTER_X')
      }
      
      return null
    }
  }

  // YouTube profile
  static async getYouTubeProfile(handleOrId: string) {
    try {
      const url = handleOrId.startsWith('@') 
        ? `https://youtube.com/${handleOrId}`
        : `https://youtube.com/@${handleOrId}`
      
      const result = await this.callPythonScraper(url)
      
      if (result?.success && result.data) {
        return {
          name: result.data.username,
          username: result.data.username,
          platform: 'YOUTUBE' as Platform,
          followers: result.data.followers,
          following: result.data.following,
          posts: result.data.posts,
          bio: result.data.bio,
          profileUrl: result.data.profile_url,
          isPrivate: result.data.is_private,
          isVerified: result.data.is_verified,
          profilePicture: result.data.profile_picture
        }
      }

      // Try to find in celebrity database as fallback
      const celebrity = findCelebrity(handleOrId, 'YOUTUBE')
      if (celebrity) {
        console.log(`Found YouTube celebrity data for ${handleOrId}: ${celebrity.name}`)
        return this.convertCelebrityToProfile(celebrity, 'YOUTUBE')
      }

      // Final fallback with minimal data
      return {
        name: handleOrId,
        username: handleOrId,
        platform: 'YOUTUBE' as Platform,
        followers: null,
        following: null,
        posts: null,
        bio: '',
        profileUrl: url,
        isPrivate: false,
        isVerified: false,
        profilePicture: ''
      }
    } catch (error) {
      console.error('YouTube profile fetch failed:', error)
      
      // Try celebrity database as last resort
      const celebrity = findCelebrity(handleOrId, 'YOUTUBE')
      if (celebrity) {
        console.log(`Found YouTube celebrity data for ${handleOrId} after error: ${celebrity.name}`)
        return this.convertCelebrityToProfile(celebrity, 'YOUTUBE')
      }
      
      return null
    }
  }

  // LinkedIn profile
  static async getLinkedInProfile(username: string) {
    try {
      const url = `https://linkedin.com/in/${username}`
      const result = await this.callPythonScraper(url)
      
      if (result?.success && result.data) {
        return {
          name: result.data.username,
          username: result.data.username,
          platform: 'LINKEDIN' as Platform,
          followers: result.data.followers,
          following: result.data.following,
          posts: result.data.posts,
          bio: result.data.bio,
          profileUrl: result.data.profile_url,
          isPrivate: result.data.is_private,
          isVerified: result.data.is_verified,
          profilePicture: result.data.profile_picture
        }
      }

      // Try to find in celebrity database as fallback
      const celebrity = findCelebrity(username, 'LINKEDIN')
      if (celebrity) {
        console.log(`Found LinkedIn celebrity data for ${username}: ${celebrity.name}`)
        return this.convertCelebrityToProfile(celebrity, 'LINKEDIN')
      }

      // Final fallback with minimal data
      return {
        name: username,
        username: username,
        platform: 'LINKEDIN' as Platform,
        followers: null,
        following: null,
        posts: null,
        bio: '',
        profileUrl: url,
        isPrivate: false,
        isVerified: false,
        profilePicture: ''
      }
    } catch (error) {
      console.error('LinkedIn profile fetch failed:', error)
      
      // Try celebrity database as last resort
      const celebrity = findCelebrity(username, 'LINKEDIN')
      if (celebrity) {
        console.log(`Found LinkedIn celebrity data for ${username} after error: ${celebrity.name}`)
        return this.convertCelebrityToProfile(celebrity, 'LINKEDIN')
      }
      
      return null
    }
  }

  // TikTok profile
  static async getTikTokProfile(username: string) {
    try {
      const url = `https://tiktok.com/@${username}`
      const result = await this.callPythonScraper(url)
      
      if (result?.success && result.data) {
        return {
          name: result.data.username,
          username: result.data.username,
          platform: 'TIKTOK' as Platform,
          followers: result.data.followers,
          following: result.data.following,
          posts: result.data.posts,
          bio: result.data.bio,
          profileUrl: result.data.profile_url,
          isPrivate: result.data.is_private,
          isVerified: result.data.is_verified,
          profilePicture: result.data.profile_picture
        }
      }

      // Try to find in celebrity database as fallback
      const celebrity = findCelebrity(username, 'TIKTOK')
      if (celebrity) {
        console.log(`Found TikTok celebrity data for ${username}: ${celebrity.name}`)
        return this.convertCelebrityToProfile(celebrity, 'TIKTOK')
      }

      // Final fallback with minimal data
      return {
        name: username,
        username: username,
        platform: 'TIKTOK' as Platform,
        followers: null,
        following: null,
        posts: null,
        bio: '',
        profileUrl: url,
        isPrivate: false,
        isVerified: false,
        profilePicture: ''
      }
    } catch (error) {
      console.error('TikTok profile fetch failed:', error)
      
      // Try celebrity database as last resort
      const celebrity = findCelebrity(username, 'TIKTOK')
      if (celebrity) {
        console.log(`Found TikTok celebrity data for ${username} after error: ${celebrity.name}`)
        return this.convertCelebrityToProfile(celebrity, 'TIKTOK')
      }
      
      return null
    }
  }

  // Legacy methods for backward compatibility
  static async scrapeInstagramFollowers(username: string): Promise<number | null> {
    try {
      const profile = await this.getInstagramProfile(username)
      return profile?.followers || null
    } catch {
      return null
    }
  }

  static async scrapeTwitterFollowers(username: string): Promise<number | null> {
    try {
      const profile = await this.getTwitterProfile(username)
      return profile?.followers || null
    } catch {
      return null
    }
  }

  static async scrapeYouTubeFollowers(handleOrId: string): Promise<number | null> {
    try {
      const profile = await this.getYouTubeProfile(handleOrId)
      return profile?.followers || null
    } catch {
      return null
    }
  }

  static async scrapeLinkedInFollowers(username: string): Promise<number | null> {
    try {
      const profile = await this.getLinkedInProfile(username)
      return profile?.followers || null
    } catch {
      return null
    }
  }

  // Get profile data by platform
  static async getProfileData(platform: string, username: string) {
    try {
      switch (platform.toUpperCase()) {
        case 'INSTAGRAM':
          return await this.getInstagramProfile(username)
        case 'TWITTER':
        case 'TWITTER_X':
        case 'X':
          return await this.getTwitterProfile(username)
        case 'YOUTUBE':
          return await this.getYouTubeProfile(username)
        case 'LINKEDIN':
          return await this.getLinkedInProfile(username)
        default:
          throw new Error(`Unsupported platform: ${platform}`)
      }
    } catch (error) {
      console.error(`Error getting profile data for ${platform}/${username}:`, error)
      return null
    }
  }

  // Get profile data from URL (auto-detect platform)
  static async getProfileDataFromUrl(url: string) {
    try {
      const result = await this.callPythonScraper(url)
      
      if (result?.success && result.data) {
        return {
          name: result.data.username,
          username: result.data.username,
          platform: result.data.platform as Platform,
          followers: result.data.followers,
          following: result.data.following,
          posts: result.data.posts,
          bio: result.data.bio,
          profileUrl: result.data.profile_url,
          isPrivate: result.data.is_private,
          isVerified: result.data.is_verified,
          profilePicture: result.data.profile_picture
        }
      }

      return null
    } catch (error) {
      console.error('Error getting profile data from URL:', error)
      return null
    }
  }

  // Get multiple profiles
  static async getMultipleProfiles(profiles: Array<{platform: string, username: string}>) {
    const results = []
    
    for (const profile of profiles) {
      try {
        const data = await this.getProfileData(profile.platform, profile.username)
        if (data) {
          results.push(data)
        }
      } catch (error) {
        console.error(`Error fetching ${profile.platform}/${profile.username}:`, error)
      }
    }
    
    return results
  }

  // Get celebrity suggestions for a platform
  static getCelebritySuggestions(platform: string, limit: number = 5) {
    const normalizedPlatform = platform.toUpperCase()
    const celebrities = getCelebritiesByPlatform(normalizedPlatform)
    return celebrities.slice(0, limit)
  }

  // Search celebrities
  static searchCelebrities(query: string, limit: number = 10) {
    return searchCelebritiesDB(query).slice(0, limit)
  }

  // Get all celebrity categories
  static getCelebrityCategories() {
    const categories = new Set(celebrityDatabase.map(c => c.category))
    return Array.from(categories)
  }
}
