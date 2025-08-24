"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import { 
  TrendingUp, TrendingDown, Users, Eye, Heart, MessageCircle, Share2,
  Calendar, BarChart3, PieChart as PieChartIcon, Activity
} from 'lucide-react'

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
    followers: number
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

interface AnalyticsDashboardProps {
  data: AnalyticsData
  loading?: boolean
  onRefresh?: () => void
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

export default function AnalyticsDashboard({ data, loading = false, onRefresh }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState('30')
  const [selectedMetric, setSelectedMetric] = useState('engagement')

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-5 bg-muted rounded w-1/3"></div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const getMetricValue = (metric: string) => {
    switch (metric) {
      case 'likes':
        return data.engagementMetrics.totalLikes
      case 'comments':
        return data.engagementMetrics.totalComments
      case 'shares':
        return data.engagementMetrics.totalShares
      case 'views':
        return data.engagementMetrics.totalViews
      default:
        return data.engagementMetrics.engagementRate
    }
  }

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'likes':
        return <Heart className="h-4 w-4" />
      case 'comments':
        return <MessageCircle className="h-4 w-4" />
      case 'shares':
        return <Share2 className="h-4 w-4" />
      case 'views':
        return <Eye className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case 'likes':
        return 'Total Likes'
      case 'comments':
        return 'Total Comments'
      case 'shares':
        return 'Total Shares'
      case 'views':
        return 'Total Views'
      default:
        return 'Engagement Rate'
    }
  }

  const getMetricSuffix = (metric: string) => {
    switch (metric) {
      case 'engagement':
        return '%'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Real-time social media performance insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          {onRefresh && (
            <Button onClick={onRefresh} variant="outline" size="sm">
              <Activity className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          )}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
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
            <Users className="h-4 w-4 text-muted-foreground" />
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
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="posts">Top Posts</TabsTrigger>
        </TabsList>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Time Series Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
                <CardDescription>Daily metrics for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.timeSeries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      formatter={(value, name) => [formatNumber(Number(value)), name]}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="likes" stroke="#0088FE" strokeWidth={2} />
                    <Line type="monotone" dataKey="comments" stroke="#00C49F" strokeWidth={2} />
                    <Line type="monotone" dataKey="shares" stroke="#FFBB28" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Area Chart for Views */}
            <Card>
              <CardHeader>
                <CardTitle>Views Trend</CardTitle>
                <CardDescription>Daily view count progression</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data.timeSeries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      formatter={(value) => [formatNumber(Number(value)), 'Views']}
                    />
                    <Area type="monotone" dataKey="views" stroke="#8884D8" fill="#8884D8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Platforms Tab */}
        <TabsContent value="platforms" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Breakdown Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>Posts and engagement by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.platformBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [formatNumber(Number(value)), name]} />
                    <Legend />
                    <Bar dataKey="posts" fill="#0088FE" />
                    <Bar dataKey="engagement" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Platform Distribution Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Posts distribution across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.platformBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ platform, posts }) => `${platform}: ${posts}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="posts"
                    >
                      {data.platformBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatNumber(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Engagement Metrics Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Performance across different metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={[
                    {
                      metric: 'Likes',
                      value: data.engagementMetrics.avgLikes,
                      fullMark: Math.max(data.engagementMetrics.avgLikes * 1.2, 100)
                    },
                    {
                      metric: 'Comments',
                      value: data.engagementMetrics.avgComments,
                      fullMark: Math.max(data.engagementMetrics.avgComments * 1.2, 50)
                    },
                    {
                      metric: 'Shares',
                      value: data.engagementMetrics.avgShares,
                      fullMark: Math.max(data.engagementMetrics.avgShares * 1.2, 30)
                    },
                    {
                      metric: 'Views',
                      value: data.engagementMetrics.avgViews,
                      fullMark: Math.max(data.engagementMetrics.avgViews * 1.2, 1000)
                    }
                  ]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis />
                    <Radar name="Average" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Tooltip formatter={(value) => formatNumber(Number(value))} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Metric Comparison Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Metric Comparison</CardTitle>
                <CardDescription>Average performance by metric type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { metric: 'Likes', value: data.engagementMetrics.avgLikes },
                    { metric: 'Comments', value: data.engagementMetrics.avgComments },
                    { metric: 'Shares', value: data.engagementMetrics.avgShares },
                    { metric: 'Views', value: data.engagementMetrics.avgViews }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatNumber(Number(value))} />
                    <Bar dataKey="value" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Top Posts Tab */}
        <TabsContent value="posts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
              <CardDescription>Posts with highest engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topPosts.slice(0, 10).map((post, index) => (
                  <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
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
    </div>
  )
}
