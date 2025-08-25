"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Calendar, DollarSign, Users, Target, BarChart3, Plus, MoreHorizontal, Play, Pause, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Campaign {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  budget: number
  status: string
  goals: string[]
  progress: number
  influencerCount: number
  totalReach: number
  totalEngagement: number
  spentBudget: number
}

export default function DemoCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  useEffect(() => {
    // Set hardcoded demo campaign data
    setCampaigns([
      {
        id: '1',
        name: 'Summer Fashion Collection',
        description: 'Promoting our new summer fashion line with top fashion influencers',
        startDate: '2024-06-01',
        endDate: '2024-08-31',
        budget: 15000,
        status: 'ACTIVE',
        goals: ['Brand Awareness', 'Sales Conversion', 'Social Media Growth'],
        progress: 75,
        influencerCount: 8,
        totalReach: 2500000,
        totalEngagement: 4.8,
        spentBudget: 11250
      },
      {
        id: '2',
        name: 'Tech Product Launch',
        description: 'Launch campaign for new tech product targeting tech enthusiasts',
        startDate: '2024-07-01',
        endDate: '2024-09-30',
        budget: 25000,
        status: 'ACTIVE',
        goals: ['Product Launch', 'Market Penetration', 'User Acquisition'],
        progress: 45,
        influencerCount: 12,
        totalReach: 1800000,
        totalEngagement: 6.2,
        spentBudget: 11250
      },
      {
        id: '3',
        name: 'Holiday Marketing',
        description: 'Holiday season marketing campaign with festive content',
        startDate: '2024-11-01',
        endDate: '2024-12-31',
        budget: 20000,
        status: 'DRAFT',
        goals: ['Seasonal Sales', 'Customer Retention', 'Brand Loyalty'],
        progress: 0,
        influencerCount: 0,
        totalReach: 0,
        totalEngagement: 0,
        spentBudget: 0
      },
      {
        id: '4',
        name: 'Fitness Challenge',
        description: '30-day fitness challenge with fitness influencers',
        startDate: '2024-05-15',
        endDate: '2024-06-15',
        budget: 12000,
        status: 'COMPLETED',
        goals: ['Community Building', 'Brand Engagement', 'User Generated Content'],
        progress: 100,
        influencerCount: 15,
        totalReach: 3200000,
        totalEngagement: 8.5,
        spentBudget: 12000
      }
    ])
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    const colors = {
      'ACTIVE': 'bg-green-100 text-green-800',
      'DRAFT': 'bg-gray-100 text-gray-800',
      'PAUSED': 'bg-yellow-100 text-yellow-800',
      'COMPLETED': 'bg-blue-100 text-blue-800',
      'CANCELLED': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Play className="h-4 w-4" />
      case 'PAUSED':
        return <Pause className="h-4 w-4" />
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <BarChart3 className="h-4 w-4" />
    }
  }

  const calculateDaysLeft = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Demo Campaigns</h1>
              <Badge variant="secondary">Hardcoded Data</Badge>
              <TrendingUp className="h-5 w-5 text-primary" />
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
            This is a demo campaigns page with hardcoded data. Sign up to manage real campaigns!
          </p>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaigns.length}</div>
              <p className="text-xs text-muted-foreground">
                {campaigns.filter(c => c.status === 'ACTIVE').length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(campaigns.reduce((sum, c) => sum + c.budget, 0))}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(campaigns.reduce((sum, c) => sum + c.spentBudget, 0))} spent
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(campaigns.reduce((sum, c) => sum + c.totalReach, 0))}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all campaigns
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(campaigns.reduce((sum, c) => sum + c.totalEngagement, 0) / campaigns.filter(c => c.totalEngagement > 0).length).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Across active campaigns
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {campaign.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(campaign.status)}>
                      {getStatusIcon(campaign.status)}
                      <span className="ml-1">{campaign.status}</span>
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>

                {/* Campaign Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">{campaign.influencerCount}</p>
                    <p className="text-muted-foreground">Influencers</p>
                  </div>
                  <div>
                    <p className="font-medium">{formatNumber(campaign.totalReach)}</p>
                    <p className="text-muted-foreground">Total Reach</p>
                  </div>
                  <div>
                    <p className="font-medium">{campaign.totalEngagement.toFixed(1)}%</p>
                    <p className="text-muted-foreground">Engagement</p>
                  </div>
                  <div>
                    <p className="font-medium">{formatCurrency(campaign.spentBudget)}</p>
                    <p className="text-muted-foreground">Spent</p>
                  </div>
                </div>

                {/* Budget Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Budget</span>
                    <span>{formatCurrency(campaign.spentBudget)} / {formatCurrency(campaign.budget)}</span>
                  </div>
                  <Progress value={(campaign.spentBudget / campaign.budget) * 100} className="h-2" />
                </div>

                {/* Goals */}
                <div>
                  <p className="text-sm font-medium mb-2">Goals:</p>
                  <div className="flex flex-wrap gap-1">
                    {campaign.goals.map((goal, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  {campaign.status === 'ACTIVE' && (
                    <span className="text-orange-600 font-medium">
                      {calculateDaysLeft(campaign.endDate)} days left
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    Manage Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Demo Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">This is a Demo</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Hardcoded Data:</strong> All campaign data is pre-defined for demonstration</li>
            <li>• <strong>Progress Tracking:</strong> See how campaigns progress with visual indicators</li>
            <li>• <strong>Budget Management:</strong> Track spending and budget allocation</li>
            <li>• <strong>Real Features:</strong> Sign up to create and manage real campaigns</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
