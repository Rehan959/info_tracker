import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { TrendingUp, Clock, Plus, Edit, Trash2, Play, Pause, Users, BarChart3 } from "lucide-react"
import Link from "next/link"

const mockScheduledReports = [
  {
    id: 1,
    name: "Weekly Trend Brief",
    frequency: "Weekly",
    nextRun: "2024-11-25 09:00",
    recipients: ["team@company.com", "marketing@company.com"],
    status: "active",
    lastSent: "2024-11-18 09:00",
    template: "Standard Weekly",
  },
  {
    id: 2,
    name: "Competitor Analysis",
    frequency: "Bi-weekly",
    nextRun: "2024-11-28 14:00",
    recipients: ["strategy@company.com"],
    status: "active",
    lastSent: "2024-11-14 14:00",
    template: "Competitor Focus",
  },
  {
    id: 3,
    name: "Monthly Executive Summary",
    frequency: "Monthly",
    nextRun: "2024-12-01 08:00",
    recipients: ["executives@company.com"],
    status: "paused",
    lastSent: "2024-11-01 08:00",
    template: "Executive Summary",
  },
]

function ScheduledReportCard({ report }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{report.name}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Clock className="h-4 w-4" />
              {report.frequency} • Next: {report.nextRun}
            </CardDescription>
          </div>
          <Badge variant={report.status === "active" ? "default" : "secondary"}>{report.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm">
          <p className="text-muted-foreground">Recipients:</p>
          <p className="font-medium">{report.recipients.join(", ")}</p>
        </div>
        <div className="text-sm">
          <p className="text-muted-foreground">Template:</p>
          <p className="font-medium">{report.template}</p>
        </div>
        <div className="text-sm">
          <p className="text-muted-foreground">Last Sent:</p>
          <p className="font-medium">{report.lastSent}</p>
        </div>
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            {report.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AutomationPage() {
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
            <span className="text-sm font-medium">Automation</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Automation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create Automated Report</DialogTitle>
                <DialogDescription>
                  Set up automated trend briefs to be sent to your team every 48 hours or on a custom schedule.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="report-name" className="text-right">
                    Name
                  </Label>
                  <Input id="report-name" placeholder="Weekly Trend Brief" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="frequency" className="text-right">
                    Frequency
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="48h">Every 48 Hours</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="template" className="text-right">
                    Template
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Weekly</SelectItem>
                      <SelectItem value="competitor">Competitor Focus</SelectItem>
                      <SelectItem value="executive">Executive Summary</SelectItem>
                      <SelectItem value="trends">Trend Spotlight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="recipients" className="text-right">
                    Recipients
                  </Label>
                  <Textarea
                    id="recipients"
                    placeholder="team@company.com, marketing@company.com"
                    className="col-span-3"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Automation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs defaultValue="scheduled" className="space-y-6">
          <TabsList>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="scheduled" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Scheduled Reports</h2>
                <p className="text-muted-foreground">Automated trend briefs and reports sent to your team</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  2 Active
                </Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-700">
                  1 Paused
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockScheduledReports.map((report) => (
                <ScheduledReportCard key={report.id} report={report} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email delivery and notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications when reports are generated
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Delivery Confirmations</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when automated reports are successfully sent
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Error Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts when automated reports fail to generate or send
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-sender">Default Sender Email</Label>
                  <Input id="default-sender" placeholder="noreply@company.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reply-to">Reply-To Email</Label>
                  <Input id="reply-to" placeholder="marketing@company.com" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Settings</CardTitle>
                <CardDescription>Default settings for automated reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="default-timerange">Default Time Range</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select default time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="48h">Last 48 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="14d">Last 14 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Include Competitor Analysis</Label>
                    <p className="text-sm text-muted-foreground">
                      Include competitor insights in automated reports by default
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Include Performance Metrics</Label>
                    <p className="text-sm text-muted-foreground">Include detailed engagement and performance metrics</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Include Recommendations</Label>
                    <p className="text-sm text-muted-foreground">Include AI-generated strategic recommendations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Standard Weekly</CardTitle>
                      <CardDescription>Comprehensive weekly overview</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete analysis including engagement trends, top performers, and competitive insights.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs">
                      <BarChart3 className="h-3 w-3" />
                      <span>Performance metrics</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="h-3 w-3" />
                      <span>Influencer insights</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <TrendingUp className="h-3 w-3" />
                      <span>Trend analysis</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Competitor Focus</CardTitle>
                      <CardDescription>Competitive intelligence brief</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Deep dive into competitor activities, strategies, and performance benchmarks.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="h-3 w-3" />
                      <span>Competitor analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <BarChart3 className="h-3 w-3" />
                      <span>Performance comparison</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <TrendingUp className="h-3 w-3" />
                      <span>Market positioning</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Executive Summary</CardTitle>
                      <CardDescription>High-level strategic overview</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Concise summary focused on key metrics, trends, and strategic recommendations.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs">
                      <BarChart3 className="h-3 w-3" />
                      <span>Key metrics</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <TrendingUp className="h-3 w-3" />
                      <span>Strategic insights</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="h-3 w-3" />
                      <span>Recommendations</span>
                    </div>
                  </div>
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
