"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, TrendingUp, Clock, Bell, Settings, User, LogOut, Sparkles } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useUser } from "@clerk/nextjs"

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

export default function UserDashboard() {
  const { user, isLoaded: clerkLoaded } = useUser()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Fetch real dashboard data
    if (!clerkLoaded || !mounted) return

    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/dashboard', { redirect: 'manual' })
        
        let data: any
        if (response.ok) {
          data = await response.json()
        } else if (response.status === 401 || response.status === 0) {
          // Fallback to demo data when unauthorized or redirected by middleware
          const demoRes = await fetch('/api/demo-dashboard')
          if (!demoRes.ok) throw new Error('Failed to fetch demo dashboard data')
          data = await demoRes.json()
        } else {
          throw new Error('Failed to fetch dashboard data')
        }
        
        setDashboardData(data)
        setLastUpdated(new Date().toLocaleTimeString())
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()

    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000)

    return () => clearInterval(interval)
  }, [clerkLoaded, mounted])

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  // Loading state
  if (!clerkLoaded || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation showNotifications={true} showAddInfluencer={true} />
        <main className="p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation showNotifications={true} showAddInfluencer={true} />
        <main className="p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Use real data or fallback to empty state
  const stats = dashboardData?.stats || {
    totalInfluencers: 0,
    activeCampaigns: 0,
    avgEngagement: 0,
    nextBrief: null
  }

  const performance = dashboardData?.performance || {
    totalReach: 0,
    totalImpressions: 0,
    estimatedValue: 0,
    avgLikes: 0,
    avgComments: 0,
    avgShares: 0,
    avgViews: 0
  }

  const recentActivities = dashboardData?.recentActivities || []

  return (
    <div className="min-h-screen bg-background">
      <Navigation showNotifications={true} showAddInfluencer={true} />

      {/* Main Content */}
      <main className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress || 'User'}! 👋</h2>
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </div>
            {lastUpdated && (
              <div className="text-sm text-muted-foreground">
                Last updated: {lastUpdated} 🔄
              </div>
            )}
          </div>
          <p className="text-muted-foreground">Here's what's happening with your influencer campaigns today.</p>
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
                {stats.totalInfluencers > 0 ? '+2 from last week' : 'No influencers yet'}
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
                {stats.activeCampaigns > 0 ? '3 ending this week' : 'No active campaigns'}
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
                {stats.avgEngagement > 0 ? '+0.3% from last period' : 'No engagement data'}
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
                {stats.nextBrief ? 'Auto-generated report' : 'No briefs scheduled'}
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
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
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
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-muted-foreground mb-2">No recent activities</div>
                  <p className="text-sm text-muted-foreground">Activities will appear here as you monitor influencers</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your influencer monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/influencers">
                <Button className="w-full justify-start bg-transparent hover:bg-muted/50" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Influencer
                </Button>
              </Link>
              <Link href="/content">
                <Button className="w-full justify-start bg-transparent hover:bg-muted/50" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Content Monitor
                </Button>
              </Link>
              <Link href="/briefs">
                <Button className="w-full justify-start bg-transparent hover:bg-muted/50" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Generate Trend Brief
                </Button>
              </Link>
              <Link href="/automation">
                <Button className="w-full justify-start bg-transparent hover:bg-muted/50" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Setup Automation
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
                    {performance.totalReach > 0 ? 
                      (performance.totalReach / 1000000).toFixed(1) + 'M' : 
                      '0'
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">Total Reach</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {performance.totalReach > 0 ? '+12% vs last month' : 'No data yet'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {performance.totalImpressions > 0 ? 
                      (performance.totalImpressions / 1000).toFixed(0) + 'K' : 
                      '0'
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">Total Impressions</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {performance.totalImpressions > 0 ? '+8% vs last month' : 'No data yet'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {performance.estimatedValue > 0 ? 
                      '$' + (performance.estimatedValue / 1000).toFixed(0) + 'K' : 
                      '$0'
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">Estimated Value</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {performance.estimatedValue > 0 ? '+15% vs last month' : 'No data yet'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
