"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, Eye, Heart, MessageCircle, Share2, Activity, BarChart3 } from 'lucide-react'
import AnalyticsCharts from '@/components/analytics-charts'

interface AnalyticsData {
  timeSeries: Array<{
    date: string
    posts: number
    likes: number
    comments: number
    shares: number
    views: number
  }>
  platformBreakdown: Array<{
    platform: string
    posts: number
    engagement: number
  }>
  engagementMetrics: {
    totalPosts: number
    totalLikes: number
    totalComments: number
    totalShares: number
    totalViews: number
    avgLikes: number
    avgComments: number
    avgShares: number
    avgViews: number
    engagementRate: number
  }
  topPosts: Array<{
    id: string
    title: string
    platform: string
    likes: number
    comments: number
    shares: number
    views: number
    engagement: number
    publishedAt: string
  }>
}

export default function DemoAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/social-media')
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data')
      }
      
      const analyticsData = await response.json()
      setData(analyticsData)
    } catch (error) {
      console.error('Error fetching analytics data:', error)
      setError('Failed to load analytics data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading analytics...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error || 'No data available'}</p>
              <Button onClick={fetchAnalyticsData}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Demo Analytics Dashboard</h1>
            <Badge variant="secondary">Real-time Data</Badge>
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <p className="text-muted-foreground mt-2">
            This dashboard shows real-time social media analytics with beautiful charts and graphs
          </p>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(data.engagementMetrics.totalPosts)}</div>
              <p className="text-xs text-muted-foreground">
                Across all platforms
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(data.engagementMetrics.totalViews)}</div>
              <p className="text-xs text-muted-foreground">
                Combined views across platforms
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.engagementMetrics.engagementRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Likes + Comments + Shares / Views
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(
                  data.engagementMetrics.totalLikes + 
                  data.engagementMetrics.totalComments + 
                  data.engagementMetrics.totalShares
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Likes + Comments + Shares
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="posts">Top Posts</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <AnalyticsCharts data={data} />
          </TabsContent>

          {/* Platforms Tab */}
          <TabsContent value="platforms" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Performance Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Performance Details</CardTitle>
                  <CardDescription>Detailed breakdown by platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.platformBreakdown.map((platform, index) => (
                      <div key={platform.platform} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'][index % 5] }}></div>
                          <div>
                            <p className="font-medium">{platform.platform}</p>
                            <p className="text-sm text-muted-foreground">{platform.posts} posts</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{platform.engagement.toFixed(1)}%</div>
                          <div className="text-sm text-muted-foreground">engagement</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Comparison</CardTitle>
                  <CardDescription>Average engagement rates by platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.platformBreakdown.map((platform) => (
                      <div key={platform.platform} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{platform.platform}</span>
                          <span className="font-medium">{platform.engagement.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(platform.engagement / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Top Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
                <CardDescription>Posts with highest engagement rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.topPosts.slice(0, 10).map((post, index) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{post.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="secondary">{post.platform}</Badge>
                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="font-medium">{formatNumber(post.likes)}</div>
                          <div className="text-muted-foreground">Likes</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{formatNumber(post.comments)}</div>
                          <div className="text-muted-foreground">Comments</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{formatNumber(post.shares)}</div>
                          <div className="text-muted-foreground">Shares</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{formatNumber(post.views)}</div>
                          <div className="text-muted-foreground">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{post.engagement.toFixed(1)}%</div>
                          <div className="text-muted-foreground">Engagement</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">What You're Seeing</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Real-time Charts:</strong> Beautiful visualizations using Recharts library</li>
            <li>• <strong>Multi-Platform Data:</strong> Instagram, YouTube, TikTok, Twitter, and LinkedIn</li>
            <li>• <strong>Engagement Analytics:</strong> Comprehensive metrics and performance insights</li>
            <li>• <strong>Time Series Analysis:</strong> Track performance trends over time</li>
            <li>• <strong>Platform Comparison:</strong> See which platforms perform best</li>
            <li>• <strong>Top Posts Ranking:</strong> Identify your highest-performing content</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
