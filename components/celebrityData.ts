export interface CelebrityProfile {
  name: string;
  username: string;
  platform: 'INSTAGRAM' | 'TWITTER' | 'YOUTUBE' | 'LINKEDIN' | 'TIKTOK';
  followers: number;
  posts: number;
  bio: string;
  isVerified: boolean;
  category: string;
  profileUrl: string;
  lastUpdated: string;
}

export const celebrityDatabase: CelebrityProfile[] = [
  // Instagram Celebrities
  {
    name: 'Cristiano Ronaldo',
    username: 'cristiano',
    platform: 'INSTAGRAM',
    followers: 650000000,
    posts: 4000,
    bio: 'Professional Footballer | CR7 Brand | 5x Champions League Winner',
    isVerified: true,
    category: 'Sports',
    profileUrl: 'https://instagram.com/cristiano',
    lastUpdated: '2024-08-26'
  },
  {
    name: 'Lionel Messi',
    username: 'leomessi',
    platform: 'INSTAGRAM',
    followers: 520000000,
    posts: 2500,
    bio: 'Professional Footballer | 8x Ballon d\'Or Winner | Inter Miami CF',
    isVerified: true,
    category: 'Sports',
    profileUrl: 'https://instagram.com/leomessi',
    lastUpdated: '2024-08-26'
  },
  {
    name: 'Kylie Jenner',
    username: 'kyliejenner',
    platform: 'INSTAGRAM',
    followers: 400000000,
    posts: 6000,
    bio: 'Founder & CEO of Kylie Cosmetics | Reality TV Star',
    isVerified: true,
    category: 'Entertainment',
    profileUrl: 'https://instagram.com/kyliejenner',
    lastUpdated: '2024-08-26'
  },
  {
    name: 'Selena Gomez',
    username: 'selenagomez',
    platform: 'INSTAGRAM',
    followers: 430000000,
    posts: 3000,
    bio: 'Singer | Actress | Producer | Rare Beauty Founder',
    isVerified: true,
    category: 'Entertainment',
    profileUrl: 'https://instagram.com/selenagomez',
    lastUpdated: '2024-08-26'
  },
  {
    name: 'Dwayne Johnson',
    username: 'therock',
    platform: 'INSTAGRAM',
    followers: 400000000,
    posts: 8000,
    bio: 'Actor | Producer | Businessman | Former WWE Champion',
    isVerified: true,
    category: 'Entertainment',
    profileUrl: 'https://instagram.com/therock',
    lastUpdated: '2024-08-26'
  },

  // Twitter/X Celebrities
  {
    name: 'Elon Musk',
    username: 'elonmusk',
    platform: 'TWITTER',
    followers: 180000000,
    posts: 25000,
    bio: 'CEO of Tesla and SpaceX | Owner of X (Twitter)',
    isVerified: true,
    category: 'Technology',
    profileUrl: 'https://twitter.com/elonmusk',
    lastUpdated: '2024-08-26'
  },
  {
    name: 'Barack Obama',
    username: 'BarackObama',
    platform: 'TWITTER',
    followers: 130000000,
    posts: 15000,
    bio: '44th President of the United States | Author | Community Organizer',
    isVerified: true,
    category: 'Politics',
    profileUrl: 'https://twitter.com/BarackObama',
    lastUpdated: '2024-08-26'
  },
  {
    name: 'Taylor Swift',
    username: 'taylorswift13',
    platform: 'TWITTER',
    followers: 95000000,
    posts: 5000,
    bio: 'Singer-songwriter | Grammy Award Winner | The Eras Tour',
    isVerified: true,
    category: 'Entertainment',
    profileUrl: 'https://twitter.com/taylorswift13',
    lastUpdated: '2024-08-26'
  },
  {
    name: 'Bill Gates',
    username: 'BillGates',
    platform: 'TWITTER',
    followers: 65000000,
    posts: 8000,
    bio: 'Co-founder of Microsoft | Co-chair of the Gates Foundation',
    isVerified: true,
    category: 'Technology',
    profileUrl: 'https://twitter.com/BillGates',
    lastUpdated: '2024-08-26'
  },
  {
    name: 'Justin Bieber',
    username: 'justinbieber',
    platform: 'TWITTER',
    followers: 110000000,
    posts: 12000,
    bio: 'Singer | Songwriter | Pop Star | Justice World Tour',
    isVerified: true,
    category: 'Entertainment',
    profileUrl: 'https://twitter.com/justinbieber',
    lastUpdated: '2024-08-26'
  },

  // YouTube Celebrities
  {
    name: 'MrBeast',
    username: '@MrBeast',
    platform: 'YOUTUBE',
    followers: 220000000,
    posts: 800,
    bio: 'YouTuber | Philanthropist | Creator of MrBeast Burger',
    isVerified: true,
    category: 'Entertainment',
    profileUrl: 'https://youtube.com/@MrBeast',
    lastUpdated: '2024-08-26'
  },
  {
    name: 'PewDiePie',
    username: '@PewDiePie',
    platform: 'YOUTUBE',
    followers: 110000000,
    posts: 5000,
    bio: 'YouTuber | Gamer | Content Creator',
    isVerified: true,
    category: 'Entertainment',
    profileUrl: 'https://youtube.com/@PewDiePie',
    lastUpdated: '2024-08-26'
  },
  {
    name: 'Mark Rober',
    username: '@MarkRober',
    platform: 'YOUTUBE',
    followers: 25000000,
    posts: 200,
    bio: 'Former NASA Engineer | YouTuber | Science Educator',
    isVerified: true,
    category: 'Education',
    profileUrl: 'https://youtube.com/@MarkRober',
    lastUpdated: '2024-08-26'
  },

  // LinkedIn Celebrities
  {
    name: 'Bill Gates',
    username: 'williamhgates',
    platform: 'LINKEDIN',
    followers: 39000000,
    posts: 500,
    bio: 'Chair of the Gates Foundation. Founder of Breakthrough Energy. Co-founder of Microsoft.',
    isVerified: false,
    category: 'Technology',
    profileUrl: 'https://linkedin.com/in/williamhgates',
    lastUpdated: '2024-08-26'
  },
  {
    name: 'Satya Nadella',
    username: 'satya-nadella',
    platform: 'LINKEDIN',
    followers: 8000000,
    posts: 200,
    bio: 'CEO of Microsoft | Technology Leader | Author of Hit Refresh',
    isVerified: false,
    category: 'Technology',
    profileUrl: 'https://linkedin.com/in/satya-nadella',
    lastUpdated: '2024-08-26'
  },
  {
    name: 'Arianna Huffington',
    username: 'ariannahuffington',
    platform: 'LINKEDIN',
    followers: 3000000,
    posts: 150,
    bio: 'Founder & CEO of Thrive Global | Author | Wellness Advocate',
    isVerified: false,
    category: 'Business',
    profileUrl: 'https://linkedin.com/in/ariannahuffington',
    lastUpdated: '2024-08-26'
  },

  // TikTok Celebrities
  {
    name: 'Charli D\'Amelio',
    username: '@charlidamelio',
    platform: 'TIKTOK',
    followers: 150000000,
    posts: 2000,
    bio: 'TikTok Creator | Dancer | Social Media Influencer',
    isVerified: true,
    category: 'Entertainment',
    profileUrl: 'https://tiktok.com/@charlidamelio',
    lastUpdated: '2024-08-26'
  },
  {
    name: 'Bella Poarch',
    username: '@bellapoarch',
    platform: 'TIKTOK',
    followers: 100000000,
    posts: 1500,
    bio: 'TikTok Creator | Singer | Social Media Influencer',
    isVerified: true,
    category: 'Entertainment',
    profileUrl: 'https://tiktok.com/@bellapoarch',
    lastUpdated: '2024-08-26'
  }
];

// Helper function to find celebrity by username and platform
export function findCelebrity(username: string, platform: string): CelebrityProfile | null {
  const normalizedUsername = username.toLowerCase().replace('@', '');
  const normalizedPlatform = platform.toUpperCase();
  
  return celebrityDatabase.find(celebrity => 
    celebrity.username.toLowerCase().replace('@', '') === normalizedUsername &&
    celebrity.platform === normalizedPlatform
  ) || null;
}

// Helper function to find celebrities by category
export function findCelebritiesByCategory(category: string): CelebrityProfile[] {
  return celebrityDatabase.filter(celebrity => 
    celebrity.category.toLowerCase() === category.toLowerCase()
  );
}

// Helper function to get all celebrities for a platform
export function getCelebritiesByPlatform(platform: string): CelebrityProfile[] {
  const normalizedPlatform = platform.toUpperCase();
  return celebrityDatabase.filter(celebrity => celebrity.platform === normalizedPlatform);
}

// Helper function to search celebrities by name or username
export function searchCelebrities(query: string): CelebrityProfile[] {
  const normalizedQuery = query.toLowerCase();
  return celebrityDatabase.filter(celebrity => 
    celebrity.name.toLowerCase().includes(normalizedQuery) ||
    celebrity.username.toLowerCase().includes(normalizedQuery) ||
    celebrity.bio.toLowerCase().includes(normalizedQuery)
  );
}

// Helper function to get all celebrity categories
export function getCelebrityCategories(): string[] {
  const categories = new Set(celebrityDatabase.map(c => c.category));
  return Array.from(categories);
}
