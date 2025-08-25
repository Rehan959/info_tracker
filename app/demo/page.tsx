"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Clock, Sparkles, Plus } from "lucide-react"
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

export default function DemoDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDemoData = async () => {
      try {
        setLoading(true)
        // For demo purposes, we'll use a mock user ID that matches our seed data
        const response = await fetch('/api/demo-dashboard')
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data')
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

    fetchDemoData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading demo dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <p className="text-muted-foreground">This is a demo page showing real data from the database</p>
        </div>
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
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Demo Dashboard</h1>
            <Badge variant="secondary">Real Data</Badge>
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-muted-foreground mt-2">
            This dashboard shows real data from your database instead of hardcoded values
          </p>
          <div className="flex gap-4 justify-center mt-4">
            <a href="/demo-dashboard" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              🚀 Official Demo Dashboard
            </a>
            <a href="/demo-analytics" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              📊 Analytics Demo
            </a>
            <a href="/demo-influencers" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
              <Users className="h-4 w-4" />
              👥 Influencers Demo
            </a>
            <a href="/demo-campaigns" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
              <TrendingUp className="h-4 w-4" />
              📈 Campaigns Demo
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-6">
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
                {stats.totalInfluencers > 0 ? 'Real data from database' : 'No influencers yet'}
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
                {stats.activeCampaigns > 0 ? 'Real data from database' : 'No active campaigns'}
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
                {stats.avgEngagement > 0 ? 'Real data from database' : 'No engagement data'}
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
                {stats.nextBrief ? 'Real data from database' : 'No briefs scheduled'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="hover:shadow-md transition-shadow duration-200 mb-8">
          <CardHeader>
            <CardTitle>Recent Activities (Real Data)</CardTitle>
            <CardDescription>Latest updates from monitored influencers</CardDescription>
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

        {/* Performance Overview */}
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Performance Overview (Real Data)</CardTitle>
            <CardDescription>Your influencer campaign performance from database</CardDescription>
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
                  {performance.totalReach > 0 ? 'Real data from database' : 'No data yet'}
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
                  {performance.totalImpressions > 0 ? 'Real data from database' : 'No data yet'}
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
                  {performance.estimatedValue > 0 ? 'Real data from database' : 'No data yet'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">What's Different Now?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Real Data:</strong> Numbers come from your PostgreSQL database instead of hardcoded values</li>
            <li>• <strong>Dynamic Updates:</strong> Data updates automatically as you add/remove influencers and campaigns</li>
            <li>• <strong>Realistic Metrics:</strong> Engagement rates, reach, and performance metrics are calculated from actual posts</li>
            <li>• <strong>Live Activities:</strong> Recent activities show real influencer posts and milestones</li>
            <li>• <strong>Scalable:</strong> Dashboard grows with your data, no more manual updates needed</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
