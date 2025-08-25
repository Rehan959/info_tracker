import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request) {
  try {
    const { timeRange = "7d", includeCompetitors = true, focusAreas = [] } = await request.json()

    // 1) Attempt to load live social data from our API
    let live = null
    try {
      const host = request.headers.get('host')
      const proto = request.headers.get('x-forwarded-proto') || 'http'
      if (host) {
        const base = `${proto}://${host}`
        const res = await fetch(`${base}/api/social-media`, { cache: 'no-store' })
        if (res.ok) live = await res.json()
      }
    } catch {}

    // 2) Shape data for the brief (fallback to mock if needed)
    const topPosts = Array.isArray(live?.topPosts) ? live.topPosts : []
    const engagementMetrics = live?.engagementMetrics || null

    const totalContent = topPosts.length || 156
    const avgEngagement = engagementMetrics?.engagementRate ? `${engagementMetrics.engagementRate}%` : "5.8%"

    const topPerformers = topPosts.slice(0, 3).map(p => ({
      name: p.title?.slice(0, 24) || 'Creator',
      engagement: (p.engagement != null ? `${p.engagement}%` : '6.8%'),
      platform: p.platform || 'Instagram',
    }))

    const mockData = {
      totalContent,
      avgEngagement,
      topPerformers: topPerformers.length ? topPerformers : [
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

    const hasOpenAI = Boolean(process.env.OPENAI_API_KEY)

    if (!hasOpenAI) {
      // Mock-only fallback (no external AI call)
      const brief = `Executive Summary\n- Engagement averaged ${mockData.avgEngagement} across ${mockData.totalContent} content pieces.\n- Top performers included ${mockData.topPerformers.map(p => p.name).join(", ")}.\n\nKey Trends & Insights\n- ${mockData.emergingTopics[0]} and ${mockData.emergingTopics[1]} are driving higher interaction.\n- Video formats continue to outperform static posts.\n\nCompetitive Intelligence\n- ${mockData.competitorActivity[0].name} posted ${mockData.competitorActivity[0].posts} times with ${mockData.competitorActivity[0].avgEngagement} average engagement.\n\nContent Performance Analysis\n- Posts: ${mockData.contentTypes.posts}, Videos: ${mockData.contentTypes.videos}, Reels: ${mockData.contentTypes.reels}.\n\nRecommendations\n- Double-down on high-performing video topics.\n- Pilot collaborations with micro-influencers.\n- Repurpose top content across platforms.\n\nOpportunities & Threats\n- Opportunity: capitalize on ${mockData.emergingTopics[0]}.\n- Threat: competitor activity rising in key categories.`

      return Response.json({
        brief,
        metadata: {
          generatedAt: new Date().toISOString(),
          timeRange,
          dataPoints: mockData.totalContent,
          includeCompetitors,
        },
      })
    }

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
