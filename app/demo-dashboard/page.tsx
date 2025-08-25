"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, TrendingUp, Clock, Bell, Settings, User, LogOut, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface DashboardData {
  stats: {
    totalInfluencers: number
    activeCampaigns: number
    avgEngagement: number
    nextBrief: string | null
  }
  performance: {
    totalReach: number
    totalImpressions: number
    estimatedValue: number
    avgLikes: number
    avgComments: number
    avgShares: number
    avgViews: number
  }
  recentActivities: Array<{
    id: string
    title: string
    description: string | null
    type: string
    createdAt: string
    influencer?: {
      name: string
      username: string
      platform: string
    } | null
  }>
}

export default function DemoDashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDemoData()
  }, [])

  const fetchDemoData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/demo-dashboard')
      
      if (!response.ok) {
        throw new Error('Failed to fetch demo data')
      }
      
      const data = await response.json()
      setDashboardData(data)
    } catch (error) {
      console.error('Error fetching demo data:', error)
      setError('Failed to load demo data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading demo dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || 'No demo data available'}</p>
            <Button onClick={fetchDemoData}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const stats = dashboardData.stats
  const performance = dashboardData.performance
  const recentActivities = dashboardData.recentActivities

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Demo Dashboard</h1>
              <Badge variant="secondary">Hardcoded Data</Badge>
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex gap-2">
              <Link href="/demo-analytics">
                <Button variant="outline" size="sm">
                  View Analytics
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
            This is a demo dashboard with hardcoded data. Sign up to see real-time data!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">Welcome to the Demo! 👋</h2>
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-muted-foreground">Here's what your influencer monitoring dashboard would look like with real data.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Influencers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInfluencers}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCampaigns}</div>
              <p className="text-xs text-muted-foreground">
                3 ending this week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgEngagement}%</div>
              <p className="text-xs text-muted-foreground">
                +0.3% from last period
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Brief</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.nextBrief ? 
                  Math.ceil((new Date(stats.nextBrief).getTime() - Date.now()) / (1000 * 60 * 60)) + 'h' : 
                  'No upcoming'
                }
              </div>
              <p className="text-xs text-muted-foreground">
                Auto-generated report
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your monitored influencers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={activity.id || index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.type === 'NEW_POST' ? 'bg-blue-100' :
                      activity.type === 'ENGAGEMENT_MILESTONE' ? 'bg-green-100' :
                      'bg-red-100'
                    }`}>
                      <span className="text-xs font-medium">
                        {activity.influencer?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.influencer?.platform} • {new Date(activity.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {activity.type === 'NEW_POST' ? 'New' :
                     activity.type === 'ENGAGEMENT_MILESTONE' ? 'Milestone' :
                     'Mention'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your influencer monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/auth/signup">
                <Button className="w-full justify-start bg-transparent hover:bg-muted/50" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Sign Up for Real Data
                </Button>
              </Link>
              <Link href="/demo-analytics">
                <Button className="w-full justify-start bg-transparent hover:bg-muted/50" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Demo Analytics
                </Button>
              </Link>
              <Link href="/demo-influencers">
                <Button className="w-full justify-start bg-transparent hover:bg-muted/50" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  View Demo Influencers
                </Button>
              </Link>
              <Link href="/demo-campaigns">
                <Button className="w-full justify-start bg-transparent hover:bg-muted/50" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Demo Campaigns
                </Button>
              </Link>
              <Link href="/demo">
                <Button className="w-full justify-start bg-transparent hover:bg-muted/50" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Back to Demo Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <div className="mt-8">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your influencer campaign performance this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {(performance.totalReach / 1000000).toFixed(1) + 'M'}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Reach</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    +12% vs last month
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {(performance.totalImpressions / 1000).toFixed(0) + 'K'}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Impressions</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    +8% vs last month
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {'$' + (performance.estimatedValue / 1000).toFixed(0) + 'K'}
                  </div>
                  <div className="text-sm text-muted-foreground">Estimated Value</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    +15% vs last month
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Demo Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">This is a Demo</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Hardcoded Data:</strong> All numbers and metrics are pre-defined for demonstration</li>
            <li>• <strong>No Authentication:</strong> This page works without signing in</li>
            <li>• <strong>Real-time Features:</strong> Sign up to see live data updates and real influencer monitoring</li>
            <li>• <strong>Full Functionality:</strong> The real app includes social media integration, campaign management, and more</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
