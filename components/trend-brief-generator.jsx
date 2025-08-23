"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2, Download, Calendar, BarChart3, Users, Target, TrendingUp } from "lucide-react"

export function TrendBriefGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBrief, setGeneratedBrief] = useState(null)
  const [settings, setSettings] = useState({
    timeRange: "7d",
    includeCompetitors: true,
    includeMetrics: true,
    includeRecommendations: true,
  })

  const generateBrief = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-brief", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (!response.ok) {
        throw new Error("Failed to generate brief")
      }

      const data = await response.json()
      setGeneratedBrief(data)
    } catch (error) {
      console.error("Error generating brief:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (generatedBrief) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Generated Trend Brief</h3>
            <p className="text-sm text-muted-foreground">
              Generated on {new Date(generatedBrief.metadata.generatedAt).toLocaleDateString()} •
              {generatedBrief.metadata.dataPoints} data points analyzed
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => setGeneratedBrief(null)}>
              Generate New
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{generatedBrief.brief}</div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Data Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{generatedBrief.metadata.dataPoints}</div>
              <p className="text-xs text-muted-foreground">Content pieces analyzed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Time Range
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{generatedBrief.metadata.timeRange}</div>
              <p className="text-xs text-muted-foreground">Analysis period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4" />
                Competitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{generatedBrief.metadata.includeCompetitors ? "Yes" : "No"}</div>
              <p className="text-xs text-muted-foreground">Competitive analysis</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="timeRange" className="text-sm font-medium">
              Time Range
            </Label>
            <Select
              value={settings.timeRange}
              onValueChange={(value) => setSettings({ ...settings, timeRange: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="14d">Last 14 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium">Include in Brief</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="competitors"
                checked={settings.includeCompetitors}
                onCheckedChange={(checked) => setSettings({ ...settings, includeCompetitors: checked })}
              />
              <Label htmlFor="competitors" className="text-sm">
                Competitor Analysis
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="metrics"
                checked={settings.includeMetrics}
                onCheckedChange={(checked) => setSettings({ ...settings, includeMetrics: checked })}
              />
              <Label htmlFor="metrics" className="text-sm">
                Performance Metrics
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recommendations"
                checked={settings.includeRecommendations}
                onCheckedChange={(checked) => setSettings({ ...settings, includeRecommendations: checked })}
              />
              <Label htmlFor="recommendations" className="text-sm">
                Strategic Recommendations
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Button onClick={generateBrief} disabled={isGenerating} size="lg" className="min-w-[200px]">
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Brief...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Trend Brief
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="h-8 w-8 mx-auto text-primary mb-2" />
            <h4 className="font-medium">Influencer Insights</h4>
            <p className="text-xs text-muted-foreground mt-1">Performance analysis and trends</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Target className="h-8 w-8 mx-auto text-primary mb-2" />
            <h4 className="font-medium">Competitive Intel</h4>
            <p className="text-xs text-muted-foreground mt-1">Competitor activity and strategies</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
            <h4 className="font-medium">Trend Analysis</h4>
            <p className="text-xs text-muted-foreground mt-1">Emerging topics and opportunities</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
