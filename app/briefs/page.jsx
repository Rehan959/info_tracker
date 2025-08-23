import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Calendar, Download, Share, Clock, BarChart3, Target, Lightbulb } from "lucide-react"
import Link from "next/link"
import { TrendBriefGenerator } from "@/components/trend-brief-generator"

const mockBriefs = [
  {
    id: 1,
    title: "Weekly Trend Brief - Week 47",
    date: "2024-11-18",
    timeRange: "7 days",
    status: "completed",
    keyInsights: [
      "AI automation content saw 45% increase in engagement",
      "Competitor launched sustainable fashion line",
      "Video content outperformed static posts by 2.3x",
    ],
    metrics: {
      contentAnalyzed: 156,
      avgEngagement: "5.8%",
      topPerformer: "Tech Review Pro (8.3%)",
    },
  },
  {
    id: 2,
    title: "Bi-weekly Trend Brief - Week 45-46",
    date: "2024-11-04",
    timeRange: "14 days",
    status: "completed",
    keyInsights: [
      "Holiday shopping content trending early",
      "Micro-influencers showing higher engagement rates",
      "LinkedIn B2B content gaining traction",
    ],
    metrics: {
      contentAnalyzed: 298,
      avgEngagement: "6.2%",
      topPerformer: "Fashion Forward (7.9%)",
    },
  },
  {
    id: 3,
    title: "Monthly Trend Brief - October 2024",
    date: "2024-10-31",
    timeRange: "30 days",
    status: "completed",
    keyInsights: [
      "Seasonal content performed 40% better",
      "Cross-platform campaigns showed strong ROI",
      "User-generated content increased by 25%",
    ],
    metrics: {
      contentAnalyzed: 642,
      avgEngagement: "5.4%",
      topPerformer: "Sarah Johnson (6.8%)",
    },
  },
]

function BriefCard({ brief }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{brief.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4" />
              {brief.date} • {brief.timeRange}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {brief.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Content Analyzed</p>
            <p className="font-medium">{brief.metrics.contentAnalyzed}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Avg Engagement</p>
            <p className="font-medium">{brief.metrics.avgEngagement}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Top Performer</p>
            <p className="font-medium text-xs">{brief.metrics.topPerformer}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Key Insights:</p>
          <ul className="space-y-1">
            {brief.keyInsights.map((insight, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                {insight}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function BriefsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <TrendingUp className="h-4 w-4" />
              </div>
              <h1 className="text-xl font-semibold">InfluenceTracker</h1>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium">Trend Briefs</span>
          </div>
          <div className="flex items-center gap-3">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="14d">Last 14 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Brief
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList>
            <TabsTrigger value="generate">Generate New Brief</TabsTrigger>
            <TabsTrigger value="history">Brief History</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Generate Trend Brief
                </CardTitle>
                <CardDescription>Create an AI-powered trend analysis based on your monitored content</CardDescription>
              </CardHeader>
              <CardContent>
                <TrendBriefGenerator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Brief History</h2>
                <p className="text-muted-foreground">Previously generated trend briefs and reports</p>
              </div>
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Briefs</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBriefs.map((brief) => (
                <BriefCard key={brief.id} brief={brief} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Weekly Brief</CardTitle>
                      <CardDescription>Standard 7-day analysis</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive weekly overview including engagement trends, top performers, and competitive insights.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Target className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Competitor Focus</CardTitle>
                      <CardDescription>Competitive intelligence brief</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Deep dive into competitor activities, strategies, and performance metrics.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Lightbulb className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Trend Spotlight</CardTitle>
                      <CardDescription>Emerging trends analysis</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Focus on emerging topics, viral content patterns, and future opportunities.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
