"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Instagram, Twitter, Youtube, Linkedin, 
  Link as LinkIcon, Plus, CheckCircle, AlertCircle 
} from 'lucide-react'
import { Navigation } from '@/components/navigation'

interface InfluencerLink {
  url: string
  platform: string
  username: string
  isValid: boolean
  isProcessing: boolean
  profileData?: {
    name: string
    followers: number
    bio: string
    profilePicture?: string
    isVerified?: boolean
  }
}

export default function AddInfluencerPage() {
  const [links, setLinks] = useState<InfluencerLink[]>([])
  const [newLink, setNewLink] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  // Platform detection patterns
  const platformPatterns = [
    { 
      name: 'INSTAGRAM', 
      pattern: /instagram\.com\/([^\/\?]+)/i, 
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    { 
      name: 'TWITTER_X', 
      pattern: /(?:twitter\.com|x\.com)\/([^\/\?]+)/i, 
      icon: Twitter,
      color: 'bg-gradient-to-r from-blue-400 to-blue-600'
    },
    { 
      name: 'YOUTUBE', 
      pattern: /youtube\.com\/(?:channel\/|c\/|@)?([^\/\?]+)/i, 
      icon: Youtube,
      color: 'bg-gradient-to-r from-red-500 to-red-700'
    },
    { 
      name: 'TIKTOK', 
      pattern: /tiktok\.com\/@([^\/\?]+)/i, 
      icon: Linkedin, // TODO: Replace with TikTok icon when available
      color: 'bg-gradient-to-r from-pink-500 to-red-500'
    },
    { 
      name: 'LINKEDIN', 
      pattern: /linkedin\.com\/in\/([^\/\?]+)/i, 
      icon: Linkedin,
      color: 'bg-gradient-to-r from-blue-600 to-blue-800'
    }
  ]

  const detectPlatform = (url: string): { platform: string; username: string } | null => {
    for (const platform of platformPatterns) {
      const match = url.match(platform.pattern)
      if (match) {
        return {
          platform: platform.name,
          username: match[1]
        }
      }
    }
    return null
  }

  const addLink = async () => {
    if (!newLink.trim()) return

    const detected = detectPlatform(newLink)
    if (detected) {
      const newInfluencer: InfluencerLink = {
        url: newLink,
        platform: detected.platform,
        username: detected.username,
        isValid: true,
        isProcessing: false
      }
      
      // Add to list first
      setLinks([...links, newInfluencer])
      setNewLink('')
      
      // Then fetch profile data automatically
      try {
        const response = await fetch('/api/influencers/fetch-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: newLink })
        })

        if (response.ok) {
          const profileData = await response.json()
          
          // Update the influencer with profile data
          setLinks(prevLinks => 
            prevLinks.map(link => 
              link.url === newLink 
                ? { ...link, profileData: profileData.profile }
                : link
            )
          )
        }
      } catch (error) {
        console.error('Error fetching profile data:', error)
        // Profile data is optional, so we don't show an error
      }
    } else {
      // Add as invalid link
      const newInfluencer: InfluencerLink = {
        url: newLink,
        platform: 'Unknown',
        username: 'Unknown',
        isValid: false,
        isProcessing: false
      }
      
      setLinks([...links, newInfluencer])
      setNewLink('')
    }
  }

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  const processInfluencer = async (link: InfluencerLink, index: number) => {
    if (!link.isValid) return

    // Update processing state
    const updatedLinks = [...links]
    updatedLinks[index].isProcessing = true
    setLinks(updatedLinks)

    try {
      // Call the API to add the influencer
      const response = await fetch('/api/influencers/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: link.url,
          platform: link.platform,
          username: link.username,
          profileData: link.profileData
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add influencer')
      }

      const result = await response.json()
      
      // Update success state
      updatedLinks[index].isProcessing = false
      setLinks(updatedLinks)
      
      // Show success message
      alert(`Successfully added ${link.username} from ${link.platform}! You can now view their analytics in your dashboard.`)
      
      // Remove the processed link
      removeLink(index)
      
    } catch (error) {
      console.error('Error processing influencer:', error)
      updatedLinks[index].isProcessing = false
      setLinks(updatedLinks)
      
      // Show error message
      alert(`Failed to add ${link.username}: ${error.message}`)
    }
  }

  const getPlatformIcon = (platform: string) => {
    const platformData = platformPatterns.find(p => p.name === platform)
    if (platformData) {
      const Icon = platformData.icon
      return <Icon className="h-4 w-4" />
    }
    return <LinkIcon className="h-4 w-4" />
  }

  const getPlatformColor = (platform: string) => {
    const platformData = platformPatterns.find(p => p.name === platform)
    return platformData?.color || 'bg-gray-500'
  }

  const formatPlatformName = (platform: string) => {
    switch (platform) {
      case 'INSTAGRAM': return 'Instagram'
      case 'TWITTER_X': return 'Twitter/X'
      case 'YOUTUBE': return 'YouTube'
      case 'TIKTOK': return 'TikTok'
      case 'LINKEDIN': return 'LinkedIn'
      default: return platform
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation title="Add Influencer by Link" />
      
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Add Influencer by Link</h1>
          <p className="text-muted-foreground">
            Simply paste social media profile links to start monitoring influencers
          </p>
        </div>

        {/* Add New Link */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Influencer
            </CardTitle>
            <CardDescription>
              Paste any social media profile URL (Instagram, Twitter, YouTube, TikTok, LinkedIn)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="profile-link" className="sr-only">
                  Profile Link
                </Label>
                <Input
                  id="profile-link"
                  type="url"
                  placeholder="https://instagram.com/username or https://twitter.com/username"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addLink()}
                />
              </div>
              <Button onClick={addLink} disabled={!newLink.trim()}>
                Add Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Supported Platforms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Supported Platforms</CardTitle>
            <CardDescription>
              We automatically detect and support these social media platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {platformPatterns.map((platform) => {
                const Icon = platform.icon
                return (
                  <div key={platform.name} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className={`p-2 rounded-lg ${platform.color} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{formatPlatformName(platform.name)}</p>
                      <p className="text-sm text-muted-foreground">
                        {platform.name === 'INSTAGRAM' && 'instagram.com/username'}
                        {platform.name === 'TWITTER_X' && 'twitter.com/username'}
                        {platform.name === 'YOUTUBE' && 'youtube.com/@username'}
                        {platform.name === 'TIKTOK' && 'tiktok.com/@username'}
                        {platform.name === 'LINKEDIN' && 'linkedin.com/in/username'}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Added Links */}
        {links.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Added Influencers ({links.length})</CardTitle>
              <CardDescription>
                Click "Process" to add each influencer to your monitoring dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {links.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${getPlatformColor(link.platform)} text-white`}>
                        {getPlatformIcon(link.platform)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">
                            {link.profileData?.name || link.username}
                          </p>
                          <Badge variant={link.isValid ? "default" : "destructive"}>
                            {formatPlatformName(link.platform)}
                          </Badge>
                          {link.isValid ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground break-all">
                          {link.url}
                        </p>
                        {link.profileData && (
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center gap-4 text-xs">
                              <span className="text-muted-foreground">
                                {link.profileData.followers.toLocaleString()} followers
                              </span>
                              {link.profileData.bio && (
                                <span className="text-muted-foreground truncate max-w-48">
                                  {link.profileData.bio}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {link.isValid ? (
                        <Button
                          onClick={() => processInfluencer(link, index)}
                          disabled={link.isProcessing}
                          size="sm"
                        >
                          {link.isProcessing ? 'Processing...' : 'Process'}
                        </Button>
                      ) : (
                        <Badge variant="destructive">Invalid Link</Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeLink(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium">Paste Profile Links</p>
                  <p className="text-sm text-muted-foreground">
                    Copy and paste any social media profile URL from Instagram, Twitter, YouTube, TikTok, or LinkedIn
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium">Auto-Detect Platform</p>
                  <p className="text-sm text-muted-foreground">
                    We automatically detect the platform and extract the username from the link
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium">Process & Monitor</p>
                  <p className="text-sm text-muted-foreground">
                    Click "Process" to add the influencer to your dashboard and start monitoring their performance
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <p className="font-medium">View Analytics</p>
                  <p className="text-sm text-muted-foreground">
                    Visit your analytics dashboard to see real-time data from all monitored influencers
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
