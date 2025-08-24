# Social Media API Setup Guide

This guide will help you set up real social media API integrations to fetch live data instead of using mock data.

## 🚀 Quick Start

1. **Add your API keys to `.env` file**
2. **Restart your development server**
3. **Visit `/demo-analytics` to see real data**

## 📱 Supported Platforms

### Instagram Basic Display API
- **What it provides**: Posts, likes, comments, media URLs
- **Setup**: 
  1. Go to [Facebook Developers](https://developers.facebook.com/)
  2. Create a new app
  3. Add Instagram Basic Display product
  4. Get Client ID and Client Secret
  5. Set up redirect URI

```env
INSTAGRAM_CLIENT_ID=your_client_id_here
INSTAGRAM_CLIENT_SECRET=your_client_secret_here
INSTAGRAM_REDIRECT_URI=http://localhost:3000/auth/instagram/callback
```

### Twitter/X API v2
- **What it provides**: Tweets, likes, retweets, replies, impressions
- **Setup**:
  1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
  2. Apply for Elevated access
  3. Create a new app
  4. Generate Bearer Token

```env
TWITTER_BEARER_TOKEN=your_bearer_token_here
```

### YouTube Data API v3
- **What it provides**: Videos, views, likes, comments, thumbnails
- **Setup**:
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Create a new project
  3. Enable YouTube Data API v3
  4. Create credentials (API Key)

```env
YOUTUBE_API_KEY=your_api_key_here
```

### TikTok API (via RapidAPI)
- **What it provides**: Videos, views, likes, comments, shares
- **Setup**:
  1. Go to [RapidAPI](https://rapidapi.com/)
  2. Sign up and subscribe to TikTok API
  3. Get your API key

```env
RAPIDAPI_KEY=your_rapidapi_key_here
```

### LinkedIn API (via RapidAPI)
- **What it provides**: Profile data, connections, followers
- **Setup**:
  1. Go to [RapidAPI](https://rapidapi.com/)
  2. Subscribe to LinkedIn Profile Data API
  3. Get your API key

```env
RAPIDAPI_KEY=your_rapidapi_key_here
```

## 🔧 Environment Variables

Create or update your `.env` file with the following variables:

```env
# Instagram
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
INSTAGRAM_REDIRECT_URI=http://localhost:3000/auth/instagram/callback

# Twitter/X
TWITTER_BEARER_TOKEN=your_twitter_bearer_token

# YouTube
YOUTUBE_API_KEY=your_youtube_api_key

# RapidAPI (for TikTok and LinkedIn)
RAPIDAPI_KEY=your_rapidapi_key

# Facebook (optional)
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

## 📊 What You'll Get

### Real-time Data
- **Posts**: Actual content from your social media accounts
- **Engagement**: Real likes, comments, shares, and views
- **Performance**: Live metrics and analytics
- **Trends**: Time-series data showing growth patterns

### Beautiful Charts
- **Line Charts**: Performance over time
- **Bar Charts**: Platform comparison
- **Pie Charts**: Content distribution
- **Area Charts**: View trends

### Analytics Dashboard
- **Key Metrics**: Total posts, reach, engagement rate
- **Platform Breakdown**: Performance by social network
- **Top Posts**: Highest-performing content
- **Engagement Analysis**: Detailed interaction metrics

## 🎯 Use Cases

### For Influencers
- Track performance across all platforms
- Identify best-performing content
- Monitor engagement trends
- Compare platform effectiveness

### For Brands
- Monitor campaign performance
- Track influencer partnerships
- Analyze audience engagement
- Measure ROI of social media efforts

### For Agencies
- Client reporting and analytics
- Performance benchmarking
- Content strategy optimization
- Multi-platform campaign management

## 🔒 Security & Privacy

- **API Keys**: Never commit API keys to version control
- **Rate Limits**: Respect platform-specific rate limits
- **Data Privacy**: Only fetch public data
- **User Consent**: Ensure proper authorization for private accounts

## 🚨 Rate Limits

Each platform has different rate limits:

- **Instagram**: 200 requests/hour, 5,000/day
- **Twitter**: 300 requests/15min, 1M/day
- **YouTube**: 10,000 requests/day, 100/100sec
- **TikTok**: 1,000 requests/month
- **LinkedIn**: 1,000 requests/month

## 🐛 Troubleshooting

### Common Issues

1. **"Unauthorized" errors**
   - Check if API keys are correct
   - Verify API permissions and scopes
   - Ensure tokens haven't expired

2. **Rate limit exceeded**
   - Implement request throttling
   - Cache responses when possible
   - Monitor usage in platform dashboards

3. **No data returned**
   - Verify account permissions
   - Check if content is public
   - Ensure proper authentication

### Debug Mode

Enable debug logging by setting:

```env
NODE_ENV=development
DEBUG=social-media:*
```

## 📈 Next Steps

1. **Start with one platform** (recommend Instagram or Twitter)
2. **Test with your own accounts** before client accounts
3. **Monitor API usage** and costs
4. **Implement caching** for better performance
5. **Add error handling** for robust production use

## 🆘 Support

- **Documentation**: Check platform-specific API docs
- **Community**: Join developer forums for each platform
- **Status Pages**: Monitor platform API status
- **Rate Limits**: Use platform dashboards to track usage

## 💡 Pro Tips

1. **Batch requests** when possible to reduce API calls
2. **Cache responses** to improve performance
3. **Implement retry logic** for failed requests
4. **Monitor costs** especially for paid APIs
5. **Backup data** regularly to avoid data loss

---

**Ready to get started?** Add your first API key and visit `/demo-analytics` to see the magic happen! 🎉
