"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Loader2, ChevronDown, ChevronUp } from "lucide-react"

export function AISummary({ content, type = "single" }) {
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)

  const generateSummary = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, type }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate summary")
      }

      const data = await response.json()
      setSummary(data.summary)
      setHasGenerated(true)
      setIsExpanded(true)
    } catch (error) {
      console.error("Error generating summary:", error)
      setSummary("Failed to generate summary. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (type === "single" && !hasGenerated) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={generateSummary}
        disabled={isLoading}
        className="w-full bg-transparent"
      >
        {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
        {isLoading ? "Generating..." : "AI Summary"}
      </Button>
    )
  }

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm">AI Summary</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {type === "batch" ? "Batch Analysis" : "Content Summary"}
            </Badge>
          </div>
          {hasGenerated && (
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Analyzing content...</span>
            </div>
          ) : summary ? (
            <div className="space-y-2">
              <p className="text-sm leading-relaxed">{summary}</p>
              {type === "single" && (
                <Button variant="ghost" size="sm" onClick={generateSummary} disabled={isLoading} className="text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Regenerate
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center py-4">
              <Button variant="outline" onClick={generateSummary} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                Generate Summary
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
