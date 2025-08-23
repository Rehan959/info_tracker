"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, TrendingUp, Clock, Bell, Settings, User, LogOut, Sparkles } from "lucide-react"
import Link from "next/link"
import { UserButton, useUser } from "@clerk/nextjs"
import { Navigation } from "@/components/navigation"

export default function UserDashboard() {
  const { user, isLoaded } = useUser()

  // Get user's first name or fallback to "User"
  const firstName = user?.firstName || user?.username || "User"

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
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">3 ending this week</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2%</div>
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
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-medium">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">@johndoe posted new content</p>
                    <p className="text-xs text-muted-foreground">Instagram • 2 hours ago</p>
                  </div>
                </div>
                <Badge variant="secondary">New</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-xs font-medium">SM</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">@sarahmarketing hit 100K followers</p>
                    <p className="text-xs text-muted-foreground">LinkedIn • 5 hours ago</p>
                  </div>
                </div>
                <Badge variant="secondary">Milestone</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-xs font-medium">TC</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">@techcrunch mentioned your brand</p>
                    <p className="text-xs text-muted-foreground">YouTube • 1 day ago</p>
                  </div>
                </div>
                <Badge variant="secondary">Mention</Badge>
              </div>
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
                  <div className="text-3xl font-bold text-primary mb-2">2.4M</div>
                  <div className="text-sm text-muted-foreground">Total Reach</div>
                  <div className="text-xs text-green-600 mt-1">+12% vs last month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">156K</div>
                  <div className="text-sm text-muted-foreground">Total Engagement</div>
                  <div className="text-xs text-green-600 mt-1">+8% vs last month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">$45K</div>
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
