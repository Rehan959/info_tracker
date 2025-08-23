import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request) {
  try {
    const { content, type = "single" } = await request.json()

    if (!content) {
      return Response.json({ error: "Content is required" }, { status: 400 })
    }

    let prompt
    if (type === "batch") {
      prompt = `Analyze the following social media content from multiple influencers and provide a comprehensive summary focusing on:
1. Key themes and topics
2. Engagement patterns
3. Notable trends or insights
4. Competitive intelligence
5. Brand mentions or opportunities

Content to analyze:
${Array.isArray(content) ? content.map((c) => `${c.influencer} (${c.platform}): ${c.content}`).join("\n\n") : content}

Provide a structured summary in 3-4 paragraphs.`
    } else {
      prompt = `Summarize this social media content in 2-3 sentences, focusing on the main message, key insights, and potential brand relevance:

"${content}"`
    }

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      system:
        "You are an expert social media analyst specializing in influencer marketing and brand monitoring. Provide clear, actionable insights.",
    })

    return Response.json({ summary: text })
  } catch (error) {
    console.error("Summarization error:", error)
    return Response.json({ error: "Failed to generate summary" }, { status: 500 })
  }
}
