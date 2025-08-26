#!/usr/bin/env python3
"""
Social Media Data Scraper
Free alternative to paid APIs - extracts data directly from social media profiles
"""

import requests
import re
import json
import time
from urllib.parse import urlparse
from typing import Dict, Optional, Union
import random
from dataclasses import dataclass

# Try to import Selenium for JavaScript rendering
try:
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.chrome.service import Service
    from webdriver_manager.chrome import ChromeDriverManager
    SELENIUM_AVAILABLE = True
except ImportError:
    SELENIUM_AVAILABLE = False
    print("Warning: Selenium not available. Using basic scraping only.")

@dataclass
class SocialMediaData:
    platform: str
    username: str
    followers: Optional[int]
    following: Optional[int]
    posts: Optional[int]
    bio: str
    profile_url: str
    is_private: bool
    is_verified: bool
    profile_picture: str
    error: Optional[str] = None

class SocialMediaScraper:
    def __init__(self):
        self.session = requests.Session()
        self.user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        ]
        
        # Initialize Selenium if available
        self.driver = None
        if SELENIUM_AVAILABLE:
            try:
                self._setup_selenium()
            except Exception as e:
                print(f"Warning: Selenium setup failed: {e}")
                # Don't modify the global variable
                pass
    
    def _setup_selenium(self):
        """Setup Selenium WebDriver with Chrome options"""
        try:
            chrome_options = Options()
            chrome_options.add_argument("--headless")
            chrome_options.add_argument("--no-sandbox")
            chrome_options.add_argument("--disable-dev-shm-usage")
            chrome_options.add_argument("--disable-gpu")
            chrome_options.add_argument("--window-size=1920,1080")
            chrome_options.add_argument("--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")
            
            # Try to use webdriver-manager to get Chrome driver
            try:
                service = Service(ChromeDriverManager().install())
                self.driver = webdriver.Chrome(service=service, options=chrome_options)
            except:
                # Fallback to system Chrome driver
                self.driver = webdriver.Chrome(options=chrome_options)
                
            print("✅ Selenium WebDriver initialized successfully")
        except Exception as e:
            print(f"❌ Selenium setup failed: {e}")
            raise
    
    def __del__(self):
        """Cleanup Selenium driver"""
        if self.driver:
            try:
                self.driver.quit()
            except:
                pass
    
    def _get_random_user_agent(self) -> str:
        return random.choice(self.user_agents)
    
    def _add_delay(self):
        """Add respectful delay between requests"""
        time.sleep(1 + random.random() * 2)
    
    def _make_request(self, url: str) -> Optional[str]:
        """Make HTTP request with proper headers and error handling"""
        try:
            self._add_delay()
            headers = {
                'User-Agent': self._get_random_user_agent(),
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Cache-Control': 'max-age=0',
                'Referer': 'https://www.google.com/',
                'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"'
            }
            
            response = self.session.get(url, headers=headers, timeout=30, allow_redirects=True)
            response.raise_for_status()
            
            # Check if we got a meaningful response
            if len(response.text) < 500:
                print(f"Warning: Short response for {url} ({len(response.text)} chars)")
                return None
                
            return response.text
            
        except Exception as e:
            print(f"Request failed for {url}: {e}")
            return None
    
    def _scrape_with_selenium(self, url: str, platform: str) -> Optional[str]:
        """Scrape using Selenium for JavaScript-rendered content"""
        if not self.driver or not SELENIUM_AVAILABLE:
            return None
            
        try:
            print(f"🔍 Using Selenium to scrape {url}")
            self.driver.get(url)
            
            # Wait for page to load
            time.sleep(5)
            
            # Try to wait for specific elements based on platform
            if platform == "INSTAGRAM":
                try:
                    # Wait for profile content to load
                    WebDriverWait(self.driver, 15).until(
                        EC.presence_of_element_located((By.TAG_NAME, "body"))
                    )
                    # Try to find follower count elements
                    try:
                        follower_elements = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'followers') or contains(text(), 'follower')]")
                        if follower_elements:
                            print(f"Found {len(follower_elements)} follower-related elements")
                            for elem in follower_elements[:3]:  # Show first 3
                                print(f"  - {elem.text}")
                    except:
                        pass
                except:
                    pass
            elif platform == "TWITTER":
                try:
                    # Wait for Twitter content to load
                    WebDriverWait(self.driver, 15).until(
                        EC.presence_of_element_located((By.TAG_NAME, "body"))
                    )
                    # Try to find follower count elements
                    try:
                        follower_elements = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'Followers') or contains(text(), 'follower')]")
                        if follower_elements:
                            print(f"Found {len(follower_elements)} follower-related elements")
                            for elem in follower_elements[:3]:  # Show first 3
                                print(f"  - {elem.text}")
                    except:
                        pass
                except:
                    pass
            
            # Get the page source after JavaScript execution
            html = self.driver.page_source
            print(f"Got HTML with {len(html)} characters")
            return html
            
        except Exception as e:
            print(f"Selenium scraping failed for {url}: {e}")
            return None
    
    def _save_html_for_debug(self, html: str, platform: str, username: str):
        """Save HTML content for debugging purposes"""
        try:
            filename = f"debug_{platform.lower()}_{username}_{int(time.time())}.html"
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f"Saved debug HTML to {filename}")
        except Exception as e:
            print(f"Failed to save debug HTML: {e}")
    
    def _extract_followers(self, html: str) -> Optional[int]:
        """Extract follower count from HTML using multiple patterns"""
        patterns = [
            # Instagram specific patterns (modern)
            r'"edge_followed_by"\s*:\s*{\s*"count"\s*:\s*([0-9]+)',
            r'"edge_followed_by"\s*:\s*{\s*"count"\s*:\s*"?([0-9][0-9,\.]*)"?',
            r'"followers"\s*:\s*"?([0-9][0-9,\.]*)"?',
            r'"follower_count"\s*:\s*([0-9]+)',
            r'"followers_count"\s*:\s*([0-9]+)',
            r'"subscriberCount"\s*:\s*"?([0-9][0-9,\.]*)"?',
            r'aria-label="([0-9][0-9,\.]*\s*[kmbtKMBT]?) followers"',
            r'data-followers="([0-9,\.kmbtKMBT]+)"',
            r'([0-9][0-9,\.]*\s*[kmbtKMBT]?)(?:\s+followers|\s+subscribers)',
            r'([0-9,\.]+)\s*[KMBT]?\s*followers',
            r'([0-9,\.]+)\s*[KMBT]?\s*subscribers',
            # Twitter specific patterns (modern)
            r'"followers_count"\s*:\s*([0-9]+)',
            r'"followers_count"\s*:\s*"?([0-9][0-9,\.]*)"?',
            r'"followers"\s*:\s*"?([0-9][0-9,\.]*)"?',
            # Generic patterns
            r'([0-9,\.]+)\s*[KMBT]?\s*followers',
            r'([0-9,\.]+)\s*[KMBT]?\s*subscribers',
            # New patterns for modern social media
            r'([0-9,\.]+)\s*[KMBT]?\s*[Ff]ollowers?',
            r'([0-9,\.]+)\s*[KMBT]?\s*[Ss]ubscribers?',
            r'([0-9,\.]+)\s*[KMBT]?\s*[Mm]embers?'
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, html, re.IGNORECASE)
            if matches:
                try:
                    count_str = matches[0].replace(',', '').replace('.', '')
                    if 'K' in count_str.upper():
                        return int(float(count_str.replace('K', '').replace('k', '')) * 1000)
                    elif 'M' in count_str.upper():
                        return int(float(count_str.replace('M', '').replace('m', '')) * 1000000)
                    elif 'B' in count_str.upper():
                        return int(float(count_str.replace('B', '').replace('b', '')) * 1000000000)
                    elif 'T' in count_str.upper():
                        return int(float(count_str.replace('T', '').replace('t', '')) * 1000000000000)
                    else:
                        return int(count_str)
                except (ValueError, TypeError):
                    continue
        
        return None
    
    def _extract_posts(self, html: str) -> Optional[int]:
        """Extract post count from HTML"""
        patterns = [
            # Instagram specific patterns
            r'"edge_owner_to_timeline_media"\s*:\s*{\s*"count"\s*:\s*([0-9]+)',
            r'"media_count"\s*:\s*([0-9]+)',
            r'"posts_count"\s*:\s*([0-9]+)',
            # Twitter specific patterns
            r'"statuses_count"\s*:\s*([0-9]+)',
            r'"tweets_count"\s*:\s*([0-9]+)',
            # Generic patterns
            r'([0-9,\.]+)\s*posts?',
            r'([0-9,\.]+)\s*videos?',
            r'([0-9,\.]+)\s*media'
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, html, re.IGNORECASE)
            if matches:
                try:
                    return int(matches[0].replace(',', ''))
                except (ValueError, TypeError):
                    continue
        
        return None
    
    def _extract_bio(self, html: str) -> str:
        """Extract bio/description from HTML"""
        patterns = [
            # Instagram specific patterns
            r'"biography"\s*:\s*"([^"]+)"',
            r'"biography"\s*:\s*"?([^"]+)"?',
            # Twitter specific patterns
            r'"description"\s*:\s*"([^"]+)"',
            r'"description"\s*:\s*"?([^"]+)"?',
            # Generic patterns
            r'<meta\s+name="description"\s+content="([^"]+)"',
            r'<title>([^<]+)</title>',
            r'"bio"\s*:\s*"([^"]+)"',
            r'"about"\s*:\s*"([^"]+)"'
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, html, re.IGNORECASE)
            if matches:
                bio = matches[0].strip()
                if bio and len(bio) > 5:  # Filter out very short matches
                    return bio[:200]  # Limit length
        
        return ""
    
    def scrape_instagram(self, username: str) -> SocialMediaData:
        """Scrape Instagram profile data"""
        try:
            # Try multiple URL formats and user agents
            urls = [
                f"https://www.instagram.com/{username}/?__a=1&__d=dis",
                f"https://www.instagram.com/{username}/",
                f"https://m.instagram.com/{username}/",
                f"https://www.instagram.com/{username}/?hl=en"
            ]
            
            html = None
            # First try basic scraping
            for url in urls:
                html = self._make_request(url)
                if html and len(html) > 1000:  # Ensure we got meaningful content
                    break
            
            # If basic scraping failed or got insufficient data, try Selenium
            if not html or len(html) < 1000:
                print(f"Basic scraping failed for Instagram {username}, trying Selenium...")
                html = self._scrape_with_selenium(f"https://www.instagram.com/{username}/", "INSTAGRAM")
            
            # If still no meaningful data, return error
            if not html or len(html) < 1000:
                print(f"Both basic scraping and Selenium failed for Instagram {username}")
                return SocialMediaData(
                    platform="INSTAGRAM",
                    username=username,
                    followers=None,
                    following=None,
                    posts=None,
                    bio="",
                    profile_url=f"https://instagram.com/{username}",
                    is_private=False,
                    is_verified=False,
                    profile_picture="",
                    error="Failed to fetch profile. Instagram has strict anti-scraping measures."
                )
            
            print(f"Instagram {username}: Got HTML with {len(html)} characters")
            
            # Save HTML for debugging
            self._save_html_for_debug(html, "INSTAGRAM", username)
            
            # Check if profile is private
            is_private = any(term in html.lower() for term in [
                'private', 'this account is private', 'content is private'
            ])
            
            # Check if verified
            is_verified = any(term in html.lower() for term in [
                'verified', '✓', 'checkmark', 'blue badge'
            ])
            
            followers = self._extract_followers(html)
            posts = self._extract_posts(html)
            bio = self._extract_bio(html)
            
            print(f"Instagram {username}: Extracted - Followers: {followers}, Posts: {posts}, Bio: {len(bio)} chars")
            
            # If extraction failed, provide helpful error message
            if not followers and not posts and not bio:
                return SocialMediaData(
                    platform="INSTAGRAM",
                    username=username,
                    followers=None,
                    following=None,
                    posts=None,
                    bio="",
                    profile_url=f"https://instagram.com/{username}",
                    is_private=is_private,
                    is_verified=is_verified,
                    profile_picture="",
                    error="Profile data extraction failed. Instagram's modern structure makes automated data collection difficult."
                )
            
            return SocialMediaData(
                platform="INSTAGRAM",
                username=username,
                followers=followers,
                following=None,  # Instagram doesn't show following count publicly
                posts=posts,
                bio=bio,
                profile_url=f"https://instagram.com/{username}",
                is_private=is_private,
                is_verified=is_verified,
                profile_picture=""
            )
            
        except Exception as e:
            return SocialMediaData(
                platform="INSTAGRAM",
                username=username,
                followers=None,
                following=None,
                posts=None,
                bio="",
                profile_url=f"https://instagram.com/{username}",
                is_private=False,
                is_verified=False,
                profile_picture="",
                error=f"Scraping error: {str(e)}"
            )
    
    def scrape_twitter(self, username: str) -> SocialMediaData:
        """Scrape Twitter/X profile data"""
        try:
            # Try multiple URL formats
            urls = [
                f"https://mobile.twitter.com/{username}",
                f"https://x.com/{username}",
                f"https://twitter.com/{username}",
                f"https://mobile.twitter.com/{username}?lang=en"
            ]
            
            html = None
            # First try basic scraping
            for url in urls:
                html = self._make_request(url)
                if html and len(html) > 1000:  # Ensure we got meaningful content
                    break
            
            # If basic scraping failed or got insufficient data, try Selenium
            if not html or len(html) < 1000:
                print(f"Basic scraping failed for Twitter {username}, trying Selenium...")
                html = self._scrape_with_selenium(f"https://twitter.com/{username}", "TWITTER")
            
            # If still no meaningful data, return error
            if not html or len(html) < 1000:
                print(f"Both basic scraping and Selenium failed for Twitter {username}")
                return SocialMediaData(
                    platform="TWITTER",
                    username=username,
                    followers=None,
                    following=None,
                    posts=None,
                    bio="",
                    profile_url=f"https://twitter.com/{username}",
                    is_private=False,
                    is_verified=False,
                    profile_picture="",
                    error="Failed to fetch profile. Twitter/X has strict anti-scraping measures."
                )
            
            print(f"Twitter {username}: Got HTML with {len(html)} characters")
            
            # Save HTML for debugging
            self._save_html_for_debug(html, "TWITTER", username)
            
            # Check if profile is private/protected
            is_private = any(term in html.lower() for term in [
                'protected', 'this account is protected', 'tweets are protected'
            ])
            
            # Check if verified
            is_verified = any(term in html.lower() for term in [
                'verified', '✓', 'checkmark', 'blue badge', 'blue checkmark'
            ])
            
            followers = self._extract_followers(html)
            posts = self._extract_posts(html)
            bio = self._extract_bio(html)
            
            print(f"Twitter {username}: Extracted - Followers: {followers}, Posts: {posts}, Bio: {len(bio)} chars")
            
            # If extraction failed, provide helpful error message
            if not followers and not posts and not bio:
                return SocialMediaData(
                    platform="TWITTER",
                    username=username,
                    followers=None,
                    following=None,
                    posts=None,
                    bio="",
                    profile_url=f"https://twitter.com/{username}",
                    is_private=is_private,
                    is_verified=is_verified,
                    profile_picture="",
                    error="Profile data extraction failed. Twitter/X's modern structure makes automated data collection difficult."
                )
            
            return SocialMediaData(
                platform="TWITTER",
                username=username,
                followers=followers,
                following=None,
                posts=posts,
                bio=bio,
                profile_url=f"https://twitter.com/{username}",
                is_private=is_private,
                is_verified=is_verified,
                profile_picture=""
            )
            
        except Exception as e:
            return SocialMediaData(
                platform="TWITTER",
                username=username,
                followers=None,
                following=None,
                posts=None,
                bio="",
                profile_url=f"https://twitter.com/{username}",
                is_private=False,
                is_verified=False,
                profile_picture="",
                error=f"Scraping error: {str(e)}"
            )
    
    def scrape_youtube(self, handle_or_id: str) -> SocialMediaData:
        """Scrape YouTube channel data"""
        try:
            if handle_or_id.startswith('@'):
                urls = [
                    f"https://m.youtube.com/{handle_or_id}",
                    f"https://www.youtube.com/{handle_or_id}"
                ]
            else:
                urls = [
                    f"https://m.youtube.com/@{handle_or_id}",
                    f"https://www.youtube.com/@{handle_or_id}"
                ]
            
            html = None
            for url in urls:
                html = self._make_request(url)
                if html:
                    break
            
            if not html:
                return SocialMediaData(
                    platform="YOUTUBE",
                    username=handle_or_id,
                    followers=None,
                    following=None,
                    posts=None,
                    bio="",
                    profile_url=f"https://youtube.com/@{handle_or_id}",
                    is_private=False,
                    is_verified=False,
                    profile_picture="",
                    error="Failed to fetch profile"
                )
            
            followers = self._extract_followers(html)
            posts = self._extract_posts(html)
            bio = self._extract_bio(html)
            
            return SocialMediaData(
                platform="YOUTUBE",
                username=handle_or_id,
                followers=followers,
                following=None,
                posts=posts,
                bio=bio,
                profile_url=f"https://youtube.com/@{handle_or_id}",
                is_private=False,
                is_verified="verified" in html.lower(),
                profile_picture=""
            )
            
        except Exception as e:
            return SocialMediaData(
                platform="YOUTUBE",
                username=handle_or_id,
                followers=None,
                following=None,
                posts=None,
                bio="",
                profile_url=f"https://youtube.com/@{handle_or_id}",
                is_private=False,
                is_verified=False,
                profile_picture="",
                error=str(e)
            )
    
    def scrape_linkedin(self, username: str) -> SocialMediaData:
        """Scrape LinkedIn profile data"""
        try:
            url = f"https://www.linkedin.com/in/{username}/"
            html = self._make_request(url)
            
            if not html:
                return SocialMediaData(
                    platform="LINKEDIN",
                    username=username,
                    followers=None,
                    following=None,
                    posts=None,
                    bio="",
                    profile_url=url,
                    is_private=False,
                    is_verified=False,
                    profile_picture="",
                    error="Failed to fetch profile"
                )
            
            followers = self._extract_followers(html)
            bio = self._extract_bio(html)
            
            return SocialMediaData(
                platform="LINKEDIN",
                username=username,
                followers=followers,
                following=None,
                posts=None,
                bio=bio,
                profile_url=url,
                is_private=False,
                is_verified=False,
                profile_picture=""
            )
            
        except Exception as e:
            return SocialMediaData(
                platform="LINKEDIN",
                username=username,
                followers=None,
                following=None,
                posts=None,
                bio="",
                profile_url=f"https://linkedin.com/in/{username}",
                is_private=False,
                is_verified=False,
                profile_picture="",
                error=str(e)
            )
    
    def scrape_from_url(self, url: str) -> SocialMediaData:
        """Automatically detect platform and scrape data from URL"""
        try:
            parsed = urlparse(url)
            domain = parsed.netloc.lower()
            path = parsed.path.strip('/')
            
            if 'instagram.com' in domain:
                username = path.split('/')[0] if path else ""
                return self.scrape_instagram(username)
            elif 'twitter.com' in domain or 'x.com' in domain:
                username = path.split('/')[0] if path else ""
                return self.scrape_twitter(username)
            elif 'youtube.com' in domain:
                username = path.split('/')[1] if len(path.split('/')) > 1 else path
                return self.scrape_youtube(username)
            elif 'linkedin.com' in domain:
                username = path.split('/')[1] if len(path.split('/')) > 1 else path
                return self.scrape_linkedin(username)
            else:
                return SocialMediaData(
                    platform="UNKNOWN",
                    username="",
                    followers=None,
                    following=None,
                    posts=None,
                    bio="",
                    profile_url=url,
                    is_private=False,
                    is_verified=False,
                    profile_picture="",
                    error="Unsupported platform"
                )
                
        except Exception as e:
            return SocialMediaData(
                platform="UNKNOWN",
                username="",
                followers=None,
                following=None,
                posts=None,
                bio="",
                profile_url=url,
                is_private=False,
                is_verified=False,
                profile_picture="",
                error=str(e)
            )

def main():
    """Test the scraper with example URLs"""
    scraper = SocialMediaScraper()
    
    # Test URLs
    test_urls = [
        "https://www.instagram.com/instagram/",
        "https://twitter.com/elonmusk",
        "https://www.youtube.com/@MrBeast",
        "https://www.linkedin.com/in/williamhgates/"
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
    main()
