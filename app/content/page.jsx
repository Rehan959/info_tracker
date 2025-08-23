import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Heart,
  MessageCircle,
  Share,
  Play,
  TrendingUp,
  Calendar,
  ExternalLink,
  Instagram,
  Youtube,
  Linkedin,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { AISummary } from "@/components/ai-summary"

const mockContent = [
  {
    id: 1,
    influencer: "Sarah Johnson",
    handle: "@sarahmarketing",
    platform: "LinkedIn",
    type: "post",
    content:
      "Just launched our new marketing automation tool! The response has been incredible - 500+ signups in the first 24 hours. Here's what we learned about product launches...",
    image: "/marketing-automation-dashboard.png",
    timestamp: "2 hours ago",
    engagement: {
      likes: 234,
      comments: 45,
      shares: 12,
    },
    metrics: {
      reach: "12.5K",
      engagement_rate: "4.2%",
    },
  },
  {
    id: 2,
    influencer: "Tech Review Pro",
    handle: "@techreviewpro",
    platform: "YouTube",
    type: "video",
    content:
      "iPhone 15 Pro Max vs Samsung Galaxy S24 Ultra - The Ultimate Camera Comparison! After testing both phones for 2 weeks, here are my honest thoughts...",
    image: "/smartphone-camera-comparison.png",
    timestamp: "5 hours ago",
    duration: "12:34",
    engagement: {
      likes: 1200,
      comments: 89,
      views: 15600,
    },
    metrics: {
      reach: "15.6K",
      engagement_rate: "8.3%",
    },
  },
  {
    id: 3,
    influencer: "Fashion Forward",
    handle: "@fashionforward",
    platform: "Instagram",
    type: "reel",
    content:
      "Spring fashion trends that are actually wearable! 🌸 Swipe for outfit details and where to shop these looks for less.",
    image: "/spring-fashion-outfit.png",
    timestamp: "8 hours ago",
    engagement: {
      likes: 3400,
      comments: 156,
      shares: 89,
    },
    metrics: {
      reach: "45.2K",
      engagement_rate: "8.1%",
    },
  },
  {
    id: 4,
    influencer: "Competitor Brand",
    handle: "@competitorbrand",
    platform: "Instagram",
    type: "post",
    content:
      "Excited to announce our partnership with @sustainablefashion! Together we're creating eco-friendly alternatives that don't compromise on style.",
    image: "/sustainable-fashion-partnership.png",
    timestamp: "1 day ago",
    engagement: {
      likes: 890,
      comments: 67,
      shares: 23,
    },
    metrics: {
      reach: "18.9K",
      engagement_rate: "5.2%",
    },
  },
]

function getPlatformIcon(platform) {
  switch (platform) {
    case "Instagram":
      return <Instagram className="h-4 w-4" />
    case "YouTube":
      return <Youtube className="h-4 w-4" />
    case "LinkedIn":
      return <Linkedin className="h-4 w-4" />
    default:
      return null
  }
}

function ContentCard({ content }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium">
                {content.influencer
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{content.influencer}</h3>
                <Badge variant="outline" className="text-xs">
                  {getPlatformIcon(content.platform)}
                  <span className="ml-1">{content.platform}</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {content.handle} • {content.timestamp}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed">{content.content}</p>

        {content.image && (
          <div className="relative">
            <img
              src={content.image || "/placeholder.svg"}
              alt="Content preview"
              className="w-full rounded-lg object-cover max-h-64"
            />
            {content.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-3">
                  <Play className="h-6 w-6 text-white fill-white" />
                </div>
              </div>
            )}
            {content.duration && (
              <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">{content.duration}</Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{content.engagement.likes?.toLocaleString() || content.engagement.views?.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{content.engagement.comments}</span>
            </div>
            <div className="flex items-center gap-1">
              <Share className="h-4 w-4" />
              <span>{content.engagement.shares}</span>
            </div>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Reach: </span>
            <span className="font-medium">{content.metrics.reach}</span>
            <span className="text-muted-foreground ml-2">ER: </span>
            <span className="font-medium">{content.metrics.engagement_rate}</span>
          </div>
        </div>

        <AISummary content={content.content} type="single" />
      </CardContent>
    </Card>
  )
}

export default function ContentPage() {
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
            <span className="text-sm font-medium">Content Monitor</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search content..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="post">Posts</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="reel">Reels</SelectItem>
              <SelectItem value="story">Stories</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
            <TabsTrigger value="mentions">Brand Mentions</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Content Intelligence
                    </CardTitle>
                    <CardDescription>AI-powered analysis of recent content trends</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AISummary content={mockContent} type="batch" />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockContent.map((content) => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockContent
                .filter((c) => Number.parseFloat(c.metrics.engagement_rate) > 6)
                .map((content) => (
                  <ContentCard key={content.id} content={content} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="competitors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockContent
                .filter((c) => c.influencer.includes("Competitor"))
                .map((content) => (
                  <ContentCard key={content.id} content={content} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="mentions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Mentions</CardTitle>
                <CardDescription>Content that mentions your brand or related keywords</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No brand mentions found in the selected time range.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
