"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, Plus, Filter, MoreHorizontal, ExternalLink, Crown, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Influencer {
  id: string
  name: string
  username: string
  platform: string
  followers: number
  engagement: number
  bio: string
  category: string
  status: string
  isVerified: boolean
  createdAt: string
}

export default function DemoInfluencersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchDemoInfluencers()
  }, [])

  const fetchDemoInfluencers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/demo-influencers')
      
      if (!response.ok) {
        throw new Error('Failed to fetch demo influencers')
      }
      
      const data = await response.json()
      setInfluencers(data.influencers || [])
    } catch (error) {
      console.error('Error fetching demo influencers:', error)
      // Fallback to hardcoded data
      setInfluencers([
        {
          id: '1',
          name: 'Cristiano Ronaldo',
          username: 'cristiano_instagram_current',
          platform: 'INSTAGRAM',
          followers: 650000000,
          engagement: 8.2,
          bio: 'Professional Footballer | CR7 Brand',
          category: 'Sports',
          status: 'ACTIVE',
          isVerified: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Elon Musk',
          username: 'elonmusk_twitter_current',
          platform: 'TWITTER_X',
          followers: 180000000,
          engagement: 12.5,
          bio: 'CEO of Tesla and SpaceX',
          category: 'Technology',
          status: 'ACTIVE',
          isVerified: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Sarah Johnson',
          username: 'sarahmarketing_linkedin',
          platform: 'LINKEDIN',
          followers: 125000,
          engagement: 4.8,
          bio: 'Digital Marketing Expert | Content Creator | Speaker',
          category: 'Marketing',
          status: 'ACTIVE',
          isVerified: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          name: 'TechCrunch',
          username: 'techcrunch_youtube',
          platform: 'YOUTUBE',
          followers: 4500000,
          engagement: 3.2,
          bio: 'Latest technology news and analysis',
          category: 'Technology',
          status: 'ACTIVE',
          isVerified: true,
          createdAt: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const getPlatformColor = (platform: string) => {
    const colors = {
      'INSTAGRAM': 'bg-gradient-to-r from-purple-500 to-pink-500',
      'YOUTUBE': 'bg-gradient-to-r from-red-500 to-red-600',
      'TIKTOK': 'bg-gradient-to-r from-pink-500 to-blue-500',
      'TWITTER_X': 'bg-gradient-to-r from-blue-400 to-blue-500',
      'LINKEDIN': 'bg-gradient-to-r from-blue-600 to-blue-700'
    }
    return colors[platform as keyof typeof colors] || 'bg-gray-500'
  }

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = platformFilter === 'all' || influencer.platform === platformFilter
    const matchesStatus = statusFilter === 'all' || influencer.status === statusFilter
    
    return matchesSearch && matchesPlatform && matchesStatus
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading demo influencers...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Demo Influencers</h1>
              <Badge variant="secondary">Hardcoded Data</Badge>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="flex gap-2">
              <Link href="/demo-dashboard">
                <Button variant="outline" size="sm">
                  Back to Demo
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-muted-foreground mt-2">
            This is a demo influencers page with hardcoded data. Sign up to manage real influencers!
          </p>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search influencers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                <SelectItem value="YOUTUBE">YouTube</SelectItem>
                <SelectItem value="TIKTOK">TikTok</SelectItem>
                <SelectItem value="TWITTER_X">Twitter</SelectItem>
                <SelectItem value="LINKEDIN">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="SUSPENDED">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Influencers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInfluencers.map((influencer) => (
            <Card key={influencer.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold ${getPlatformColor(influencer.platform)}`}>
                      {influencer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{influencer.name}</h3>
                        {influencer.isVerified && (
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">@{influencer.username}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={getPlatformColor(influencer.platform).replace('bg-gradient-to-r', 'border')}>
                    {influencer.platform}
                  </Badge>
                  <Badge variant={influencer.status === 'ACTIVE' ? 'default' : 'secondary'}>
                    {influencer.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {influencer.bio}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">{formatNumber(influencer.followers)}</p>
                    <p className="text-muted-foreground">Followers</p>
                  </div>
                  <div>
                    <p className="font-medium">{influencer.engagement}%</p>
                    <p className="text-muted-foreground">Engagement</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInfluencers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No influencers found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Demo Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">This is a Demo</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Hardcoded Data:</strong> All influencer data is pre-defined for demonstration</li>
            <li>• <strong>Search & Filter:</strong> Try searching for "Cristiano" or filtering by platform</li>
            <li>• <strong>Real Features:</strong> Sign up to add real influencers and manage campaigns</li>
            <li>• <strong>Multi-platform:</strong> Support for Instagram, YouTube, TikTok, Twitter, and LinkedIn</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
