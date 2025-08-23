import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit, Trash2, ExternalLink, TrendingUp, Users, Instagram, Youtube, Linkedin } from "lucide-react"
import Link from "next/link"

const mockInfluencers = [
  {
    id: 1,
    name: "Sarah Johnson",
    handle: "@sarahmarketing",
    platform: "LinkedIn",
    followers: "125K",
    engagement: "4.2%",
    category: "Marketing",
    status: "Active",
    lastPost: "2 hours ago",
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Tech Review Pro",
    handle: "@techreviewpro",
    platform: "YouTube",
    followers: "890K",
    engagement: "6.8%",
    category: "Technology",
    status: "Active",
    lastPost: "1 day ago",
    avatar: "TR",
  },
  {
    id: 3,
    name: "Fashion Forward",
    handle: "@fashionforward",
    platform: "Instagram",
    followers: "2.1M",
    engagement: "3.9%",
    category: "Fashion",
    status: "Monitoring",
    lastPost: "4 hours ago",
    avatar: "FF",
  },
  {
    id: 4,
    name: "Competitor Brand",
    handle: "@competitorbrand",
    platform: "Instagram",
    followers: "450K",
    engagement: "5.1%",
    category: "Competitor",
    status: "Competitor",
    lastPost: "6 hours ago",
    avatar: "CB",
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
      return <Users className="h-4 w-4" />
  }
}

function getStatusColor(status) {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800"
    case "Monitoring":
      return "bg-blue-100 text-blue-800"
    case "Competitor":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function InfluencersPage() {
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
            <span className="text-sm font-medium">Influencers</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Influencer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Influencer</DialogTitle>
                <DialogDescription>Add a new influencer or competitor to monitor across platforms.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Influencer name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="handle" className="text-right">
                    Handle
                  </Label>
                  <Input id="handle" placeholder="@username" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="platform" className="text-right">
                    Platform
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="influencer">Influencer</SelectItem>
                      <SelectItem value="competitor">Competitor</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea id="notes" placeholder="Optional notes..." className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Influencer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search influencers..." className="pl-10" />
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
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="influencer">Influencers</SelectItem>
              <SelectItem value="competitor">Competitors</SelectItem>
              <SelectItem value="partner">Partners</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Influencers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockInfluencers.map((influencer) => (
            <Card key={influencer.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">{influencer.avatar}</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{influencer.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        {getPlatformIcon(influencer.platform)}
                        {influencer.handle}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(influencer.status)} variant="secondary">
                    {influencer.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Followers</p>
                    <p className="font-medium">{influencer.followers}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Engagement</p>
                    <p className="font-medium">{influencer.engagement}</p>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">Category</p>
                  <p className="font-medium">{influencer.category}</p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">Last Post</p>
                  <p className="font-medium">{influencer.lastPost}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
