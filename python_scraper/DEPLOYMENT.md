# 🚀 Deployment Guide for Python Scraper

## Quick Start (Local Development)

### 1. Install Python Dependencies
```bash
cd python_scraper
pip3 install -r requirements.txt
```

### 2. Test the Scraper
```bash
python3 test_scraper.py
```

### 3. Start the API Server
```bash
python3 api_server.py
```

The API will be available at `http://localhost:8000`

## 🌐 Production Deployment Options

### Option 1: Vercel Serverless Functions

1. **Create API Routes in Next.js:**
```typescript
// app/api/scrape/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    // Call your Python scraper logic here
    // You can either:
    // A) Port the Python code to TypeScript
    // B) Use a different deployment method
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message })
  }
}
```

2. **Update Environment Variables:**
```bash
# Remove this since we're not using external Python service
# PYTHON_SCRAPER_URL=http://localhost:8000
```

### Option 2: Standalone Python Server (Recommended)

1. **Deploy to a VPS/Cloud Server:**
```bash
# On your server
git clone <your-repo>
cd python_scraper
pip3 install -r requirements.txt

# Install system dependencies
sudo apt update
sudo apt install python3-pip python3-venv

# Create virtual environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Start the service
python3 api_server.py
```

2. **Use PM2 for Process Management:**
```bash
npm install -g pm2
pm2 start api_server.py --name "social-scraper" --interpreter python3
pm2 startup
pm2 save
```

3. **Update Environment Variables:**
```bash
# In your Next.js app
PYTHON_SCRAPER_URL=https://your-server.com:8000
```

### Option 3: Docker Deployment

1. **Create Dockerfile:**
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["python3", "api_server.py"]
```

2. **Build and Run:**
```bash
docker build -t social-scraper .
docker run -p 8000:8000 social-scraper
```

3. **Docker Compose:**
```yaml
version: '3.8'
services:
  scraper:
    build: .
    ports:
      - "8000:8000"
    environment:
      - PYTHON_ENV=production
    restart: unless-stopped
```

### Option 4: Railway/Heroku

1. **Create Procfile:**
```
web: python3 api_server.py
```

2. **Deploy:**
```bash
# Railway
railway up

# Heroku
heroku create your-app-name
git push heroku main
```

## 🔧 Configuration

### Environment Variables
```bash
# Production settings
PYTHON_ENV=production
PORT=8000
HOST=0.0.0.0

# CORS settings (restrict in production)
ALLOWED_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
```

### Update CORS for Production
```python
# In api_server.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://yourdomain.com",
        "https://app.yourdomain.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📊 Monitoring & Health Checks

### Health Check Endpoint
```bash
curl https://your-server.com/health
```

### Basic Monitoring
```python
# Add to api_server.py
@app.get("/metrics")
async def get_metrics():
    return {
        "status": "healthy",
        "uptime": time.time() - start_time,
        "requests_processed": request_count,
        "last_request": last_request_time
    }
```

## 🛡️ Security Considerations

### Rate Limiting
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/api/scrape")
@limiter.limit("10/minute")  # 10 requests per minute per IP
async def scrape_profile(request: ScrapeRequest):
    # ... existing code
```

### API Key Protection (Optional)
```python
from fastapi import Security, HTTPException
from fastapi.security import HTTPBearer

security = HTTPBearer()

@app.post("/api/scrape")
async def scrape_profile(
    request: ScrapeRequest,
    token: str = Security(security)
):
    if token.credentials != "your-secret-token":
        raise HTTPException(status_code=403, detail="Invalid token")
    # ... existing code
```

## 🔄 Integration with Next.js

### Update Environment Variables
```bash
# .env.local
PYTHON_SCRAPER_URL=https://your-server.com:8000
```

### Test the Integration
```typescript
// Test the Python API
const response = await fetch('https://your-server.com:8000/api/scrape', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://instagram.com/username' })
})

const result = await response.json()
console.log(result)
```

## 🚨 Troubleshooting

### Common Issues

1. **"Connection refused"**
   - Check if the Python server is running
   - Verify the port is correct
   - Check firewall settings

2. **"CORS error"**
   - Update CORS settings in `api_server.py`
   - Ensure your domain is in `allow_origins`

3. **"Scraping failed"**
   - Check if the target URLs are accessible
   - Verify the HTML structure hasn't changed
   - Check for rate limiting from social media sites

### Debug Mode
```python
# Enable debug logging
uvicorn.run(
    "api_server:app",
    host="0.0.0.0",
    port=8000,
    reload=True,
    log_level="debug"
)
```

## 📈 Scaling Considerations

### Load Balancing
- Use multiple Python scraper instances
- Put behind a load balancer (nginx, HAProxy)
- Consider using Redis for session sharing

### Caching
```python
import redis
from functools import lru_cache

# Cache results for 1 hour
@lru_cache(maxsize=1000)
async def get_cached_profile(url: str):
    # ... implementation
```

### Queue System
```python
# For high-volume scraping
from celery import Celery

celery_app = Celery('scraper')
celery_app.config_from_object('celeryconfig')

@celery_app.task
def scrape_profile_task(url: str):
    # ... scraping logic
```

## 🎯 Next Steps

1. **Choose your deployment method** (we recommend Option 2 for simplicity)
2. **Deploy the Python service**
3. **Update your Next.js environment variables**
4. **Test the integration**
5. **Monitor performance and adjust as needed**

Your social media scraper will now work completely free without any API keys! 🎉
