# 🐍 Python Social Media Scraper

A **completely free** alternative to paid social media APIs. This Python service scrapes social media profiles directly from the web without requiring any API keys.

## ✨ Features

- **No API Keys Required** - Completely free to use
- **Multiple Platforms** - Instagram, Twitter/X, YouTube, LinkedIn
- **Smart Scraping** - Uses multiple fallback methods for reliability
- **REST API** - Easy integration with your Next.js frontend
- **Rate Limiting** - Respectful delays to avoid being blocked

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd python_scraper
pip3 install -r requirements.txt
```

### 2. Start the Service

```bash
# Option 1: Use the startup script
chmod +x start.sh
./start.sh

# Option 2: Run directly
python3 api_server.py
```

The API will be available at `http://localhost:8000`

## 📡 API Endpoints

### Scrape Profile from URL
```http
POST /api/scrape
Content-Type: application/json

{
  "url": "https://instagram.com/username"
}
```

### Scrape by Platform
```http
GET /api/scrape/instagram/username
GET /api/scrape/twitter/username
GET /api/scrape/youtube/@username
GET /api/scrape/linkedin/username
```

### Get Supported Platforms
```http
GET /api/platforms
```

### Health Check
```http
GET /health
```

## 🔧 Integration with Next.js

Update your Next.js social media service to call the Python API instead of paid services:

```typescript
// In your Next.js app
const response = await fetch('http://localhost:8000/api/scrape', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: profileUrl })
})

const result = await response.json()
if (result.success) {
  // Use result.data for profile information
  console.log(result.data.followers)
}
```

## 🌐 Supported Platforms

| Platform | URL Format | Example |
|----------|------------|---------|
| Instagram | `https://instagram.com/username` | `https://instagram.com/instagram` |
| Twitter/X | `https://twitter.com/username` | `https://twitter.com/elonmusk` |
| YouTube | `https://youtube.com/@username` | `https://youtube.com/@MrBeast` |
| LinkedIn | `https://linkedin.com/in/username` | `https://linkedin.com/in/williamhgates` |

## 🛡️ Safety Features

- **User Agent Rotation** - Different browser signatures
- **Respectful Delays** - 1-3 second delays between requests
- **Error Handling** - Graceful fallbacks when scraping fails
- **Timeout Protection** - 30-second request timeouts

## 📊 Response Format

```json
{
  "success": true,
  "data": {
    "platform": "INSTAGRAM",
    "username": "instagram",
    "followers": 1000000,
    "following": null,
    "posts": 5000,
    "bio": "Discovering and telling stories from around the world...",
    "profile_url": "https://instagram.com/instagram",
    "is_private": false,
    "is_verified": true,
    "profile_picture": ""
  }
}
```

## 🚨 Error Handling

```json
{
  "success": false,
  "error": "Failed to fetch profile: Connection timeout"
}
```

## 🔄 Deployment Options

### Local Development
- Run on your local machine for development
- Perfect for testing and development

### Vercel Functions
- Deploy as Vercel serverless functions
- Integrate directly with your Next.js app

### Docker
- Containerize for easy deployment
- Deploy to any cloud platform

### Standalone Server
- Deploy to a VPS or cloud server
- Call from your frontend via HTTP

## 💡 Tips for Best Results

1. **Use Mobile URLs** - Mobile sites often have simpler HTML
2. **Handle Rate Limits** - Don't make too many requests too quickly
3. **Monitor Errors** - Log failed requests for debugging
4. **Cache Results** - Store successful scrapes to avoid re-scraping

## 🆚 vs Paid APIs

| Feature | Python Scraper | Paid APIs |
|---------|----------------|-----------|
| Cost | **Free** | $10-100+/month |
| Rate Limits | Self-managed | API provider limits |
| Reliability | Good with fallbacks | Very reliable |
| Setup | Simple Python install | API key management |
| Customization | Full control | Limited by API |

## 🐛 Troubleshooting

### Common Issues

1. **"Module not found"** - Install requirements: `pip3 install -r requirements.txt`
2. **"Connection refused"** - Check if port 8000 is available
3. **"Scraping failed"** - Check if the profile URL is correct and public

### Debug Mode

Enable debug logging by modifying `api_server.py`:

```python
uvicorn.run(
    "api_server:app",
    host="0.0.0.0",
    port=8000,
    reload=True,
    log_level="debug"  # Change to debug
)
```

## 📝 License

This project is open source and free to use for any purpose.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the scraper!
