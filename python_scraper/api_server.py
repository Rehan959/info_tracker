#!/usr/bin/env python3
"""
FastAPI server for social media scraping
Provides REST API endpoints for Next.js frontend
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn
from scraper import SocialMediaScraper, SocialMediaData

app = FastAPI(title="Social Media Scraper API", version="1.0.0")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize scraper
scraper = SocialMediaScraper()

class ScrapeRequest(BaseModel):
    url: str

class ScrapeResponse(BaseModel):
    success: bool
    data: Optional[dict] = None
    error: Optional[str] = None

@app.get("/")
async def root():
    return {"message": "Social Media Scraper API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "social-media-scraper"}

@app.post("/api/scrape", response_model=ScrapeResponse)
async def scrape_profile(request: ScrapeRequest):
    """Scrape social media profile from URL"""
    try:
        if not request.url:
            raise HTTPException(status_code=400, detail="URL is required")
        
        # Scrape the profile
        result = scraper.scrape_from_url(request.url)
        
        if result.error:
            return ScrapeResponse(
                success=False,
                error=result.error
            )
        
        # Convert to dict for JSON response
        data = {
            "platform": result.platform,
            "username": result.username,
            "followers": result.followers,
            "following": result.following,
            "posts": result.posts,
            "bio": result.bio,
            "profile_url": result.profile_url,
            "is_private": result.is_private,
            "is_verified": result.is_verified,
            "profile_picture": result.profile_picture
        }
        
        return ScrapeResponse(
            success=True,
            data=data
        )
        
    except Exception as e:
        return ScrapeResponse(
            success=False,
            error=f"Scraping failed: {str(e)}"
        )

@app.get("/api/scrape/{platform}/{username}")
async def scrape_by_platform(platform: str, username: str):
    """Scrape specific platform profile"""
    try:
        platform = platform.upper()
        
        if platform == "INSTAGRAM":
            result = scraper.scrape_instagram(username)
        elif platform == "TWITTER":
            result = scraper.scrape_twitter(username)
        elif platform == "YOUTUBE":
            result = scraper.scrape_youtube(username)
        elif platform == "LINKEDIN":
            result = scraper.scrape_linkedin(username)
        else:
            raise HTTPException(status_code=400, detail="Unsupported platform")
        
        if result.error:
            raise HTTPException(status_code=500, detail=result.error)
        
        # Convert to dict for JSON response
        data = {
            "platform": result.platform,
            "username": result.username,
            "followers": result.followers,
            "following": result.following,
            "posts": result.posts,
            "bio": result.bio,
            "profile_url": result.profile_url,
            "is_private": result.is_private,
            "is_verified": result.is_verified,
            "profile_picture": result.profile_picture
        }
        
        return {"success": True, "data": data}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scraping failed: {str(e)}")

@app.get("/api/platforms")
async def get_supported_platforms():
    """Get list of supported platforms"""
    return {
        "platforms": [
            {
                "name": "Instagram",
                "key": "INSTAGRAM",
                "url_format": "https://instagram.com/username",
                "supported": True
            },
            {
                "name": "Twitter/X",
                "key": "TWITTER", 
                "url_format": "https://twitter.com/username",
                "supported": True
            },
            {
                "name": "YouTube",
                "key": "YOUTUBE",
                "url_format": "https://youtube.com/@username",
                "supported": True
            },
            {
                "name": "LinkedIn",
                "key": "LINKEDIN",
                "url_format": "https://linkedin.com/in/username",
                "supported": True
            }
        ]
    }

if __name__ == "__main__":
    print("Starting Social Media Scraper API...")
    print("API will be available at: http://localhost:8000")
    print("Documentation at: http://localhost:8000/docs")
    
    uvicorn.run(
        "api_server:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
