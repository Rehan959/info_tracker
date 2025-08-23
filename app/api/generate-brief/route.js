import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request) {
  try {
    const { timeRange = "7d", includeCompetitors = true, focusAreas = [] } = await request.json()

    // Mock data - in real app this would come from database
    const mockData = {
      totalContent: 156,
      avgEngagement: "5.8%",
      topPerformers: [
        { name: "Tech Review Pro", engagement: "8.3%", platform: "YouTube" },
        { name: "Fashion Forward", engagement: "8.1%", platform: "Instagram" },
      ],
      competitorActivity: [{ name: "Competitor Brand", posts: 12, avgEngagement: "5.2%" }],
      emergingTopics: ["AI automation", "sustainable fashion", "mobile photography"],
      contentTypes: { posts: 45, videos: 23, reels: 88 },
    }

    const prompt = `Generate a comprehensive trend brief for a brand team based on the following influencer monitoring data from the last ${timeRange}:

PERFORMANCE METRICS:
- Total content analyzed: ${mockData.totalContent} pieces
- Average engagement rate: ${mockData.avgEngagement}
- Top performing influencers: ${mockData.topPerformers.map((p) => `${p.name} (${p.engagement} on ${p.platform})`).join(", ")}

COMPETITOR INTELLIGENCE:
${includeCompetitors ? `- Competitor activity: ${mockData.competitorActivity.map((c) => `${c.name} posted ${c.posts} times with ${c.avgEngagement} avg engagement`).join(", ")}` : "Competitor analysis not included"}

CONTENT TRENDS:
- Emerging topics: ${mockData.emergingTopics.join(", ")}
- Content distribution: ${mockData.contentTypes.posts} posts, ${mockData.contentTypes.videos} videos, ${mockData.contentTypes.reels} reels

Please provide:
1. Executive Summary (2-3 sentences)
2. Key Trends & Insights (3-4 bullet points)
3. Competitive Intelligence (2-3 insights)
4. Content Performance Analysis
5. Recommendations for brand strategy (3-4 actionable items)
6. Opportunities & Threats

Format as a professional brief suitable for brand team leadership.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are a senior social media strategist and competitive intelligence analyst. Provide actionable insights for brand teams based on influencer monitoring data.",
    })

    return Response.json({
      brief: text,
      metadata: {
        generatedAt: new Date().toISOString(),
        timeRange,
        dataPoints: mockData.totalContent,
        includeCompetitors,
      },
    })
  } catch (error) {
    console.error("Brief generation error:", error)
    return Response.json({ error: "Failed to generate trend brief" }, { status: 500 })
  }
}
