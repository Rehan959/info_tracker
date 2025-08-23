"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, TrendingUp, Clock, Bell, Settings, User, LogOut, Sparkles } from "lucide-react"
import Link from "next/link"
import { UserButton, useUser } from "@clerk/nextjs"
import { Navigation } from "@/components/navigation"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import UserButton to avoid hydration issues
const DynamicUserButton = dynamic(() => Promise.resolve(UserButton), {
  ssr: false,
  loading: () => <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
})

interface DashboardData {
  stats: {
    totalInfluencers: number
    activeCampaigns: number
    avgEngagement: number
    nextBrief: string
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
  recentPosts: any[]
  recentActivities: any[]
  topInfluencers: any[]
}

export default function UserDashboard() {
  const { user, isLoaded } = useUser()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Get user's first name or fallback to "User"
  const firstName = user?.firstName || user?.username || "User"

  useEffect(() => {
    // Simulate loading for better UX
    if (!isLoaded || !user || !mounted) return

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isLoaded, user, mounted])

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
  if (!isLoaded || loading) {
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

  // Use real data or fallback to static data
  const stats = dashboardData?.stats || {
    totalInfluencers: 24,
    activeCampaigns: 8,
    avgEngagement: 4.2,
    nextBrief: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString()
  }

  const performance = dashboardData?.performance || {
    totalReach: 2400000,
    totalImpressions: 3000000,
    estimatedValue: 45000,
    avgLikes: 1250,
    avgComments: 89,
    avgShares: 45,
    avgViews: 8500
  }

  const recentActivities = dashboardData?.recentActivities || [
    {
      id: '1',
      title: '@johndoe posted new content',
      description: 'John Doe posted new content about travel',
      type: 'NEW_POST',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      influencer: { name: 'John Doe', username: 'johndoe', platform: 'INSTAGRAM' }
    },
    {
      id: '2',
      title: '@sarahmarketing hit 100K followers',
      description: 'Sarah Marketing reached 100K followers',
      type: 'ENGAGEMENT_MILESTONE',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      influencer: { name: 'Sarah Marketing', username: 'sarahmarketing', platform: 'LINKEDIN' }
    },
    {
      id: '3',
      title: '@techcrunch mentioned your brand',
      description: 'TechCrunch mentioned your brand in their latest video',
      type: 'BRAND_MENTION',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      influencer: { name: 'TechCrunch', username: 'techcrunch', platform: 'YOUTUBE' }
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation showNotifications={true} showAddInfluencer={true} />

      {/* Main Content */}
      <main className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">Welcome back, {firstName}! 👋</h2>
            <Sparkles className="h-5 w-5 text-yellow-500" />
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
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCampaigns}</div>
              <p className="text-xs text-muted-foreground">3 ending this week</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgEngagement}%</div>
              <p className="text-xs text-muted-foreground">+0.3% from last period</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Brief</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18h</div>
              <p className="text-xs text-muted-foreground">Auto-generated report</p>
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
                    {(performance.totalReach / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-muted-foreground">Total Reach</div>
                  <div className="text-xs text-green-600 mt-1">+12% vs last month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {(performance.totalImpressions / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-muted-foreground">Total Engagement</div>
                  <div className="text-xs text-green-600 mt-1">+8% vs last month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    ${(performance.estimatedValue / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-muted-foreground">Estimated Value</div>
                  <div className="text-xs text-green-600 mt-1">+15% vs last month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
