#!/usr/bin/env python3
"""
Test script for the social media scraper
Run this to verify everything works before starting the API server
"""

from scraper import SocialMediaScraper

def test_scraper():
    """Test the scraper with example URLs"""
    scraper = SocialMediaScraper()
    
    # Test URLs - focus on Instagram and Twitter
    test_urls = [
        "https://www.instagram.com/instagram/",
        "https://twitter.com/elonmusk"
    ]
    
    print("Testing Social Media Scraper...")
    print("=" * 50)
    
    for url in test_urls:
        print(f"\nScraping: {url}")
        result = scraper.scrape_from_url(url)
        
        if result.error:
            print(f"❌ Error: {result.error}")
        else:
            print(f"✅ Platform: {result.platform}")
            print(f"   Username: {result.username}")
            print(f"   Followers: {result.followers:,}" if result.followers else "   Followers: N/A")
            print(f"   Posts: {result.posts:,}" if result.posts else "   Posts: N/A")
            print(f"   Bio: {result.bio[:100]}..." if result.bio else "   Bio: N/A")
            print(f"   Verified: {'Yes' if result.is_verified else 'No'}")
            print(f"   Private: {'Yes' if result.is_private else 'No'}")
        
        print("-" * 30)

if __name__ == "__main__":
    test_scraper()
