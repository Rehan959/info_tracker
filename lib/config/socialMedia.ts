// Social Media API Configuration
// Add your API keys here to enable real data fetching

export const socialMediaConfig = {
  // Instagram Basic Display API
  instagram: {
    clientId: process.env.INSTAGRAM_CLIENT_ID || '',
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || '',
    redirectUri: process.env.INSTAGRAM_REDIRECT_URI || '',
  },

  // Twitter/X API v2
  twitter: {
    bearerToken: process.env.TWITTER_BEARER_TOKEN || '',
    apiKey: process.env.TWITTER_API_KEY || '',
    apiSecret: process.env.TWITTER_API_SECRET || '',
    accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
  },

  // YouTube Data API v3
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY || '',
  },

  // TikTok API (via RapidAPI)
  tiktok: {
    rapidApiKey: process.env.RAPIDAPI_KEY || '',
    rapidApiHost: 'tiktok-video-no-watermark2.p.rapidapi.com',
  },

  // LinkedIn API (via RapidAPI)
  linkedin: {
    rapidApiKey: process.env.RAPIDAPI_KEY || '',
    rapidApiHost: 'linkedin-profile-data.p.rapidapi.com',
  },

  // Facebook Graph API
  facebook: {
    accessToken: process.env.FACEBOOK_ACCESS_TOKEN || '',
    appId: process.env.FACEBOOK_APP_ID || '',
    appSecret: process.env.FACEBOOK_APP_SECRET || '',
  },
}

// Check if any APIs are configured
export const hasConfiguredAPIs = () => {
  return Object.values(socialMediaConfig).some(config => 
    Object.values(config).some(value => value !== '')
  )
}

// Get available platforms based on configuration
export const getAvailablePlatforms = () => {
  const platforms = []
  
  if (socialMediaConfig.instagram.clientId) platforms.push('INSTAGRAM')
  if (socialMediaConfig.twitter.bearerToken) platforms.push('TWITTER_X')
  if (socialMediaConfig.youtube.apiKey) platforms.push('YOUTUBE')
  if (socialMediaConfig.tiktok.rapidApiKey) platforms.push('TIKTOK')
  if (socialMediaConfig.linkedin.rapidApiKey) platforms.push('LINKEDIN')
  if (socialMediaConfig.facebook.accessToken) platforms.push('FACEBOOK')
  
  return platforms
}

// API rate limits and quotas
export const apiLimits = {
  instagram: {
    requestsPerHour: 200,
    requestsPerDay: 5000,
  },
  twitter: {
    requestsPer15Min: 300,
    requestsPerDay: 1000000,
  },
  youtube: {
    requestsPerDay: 10000,
    requestsPer100Sec: 100,
  },
  tiktok: {
    requestsPerMonth: 1000,
  },
  linkedin: {
    requestsPerMonth: 1000,
  },
}
