// Free AI alternatives to OpenAI
export class AIService {
  // Free Hugging Face Inference API (no API key required for basic models)
  static async generateSummary(text: string): Promise<string> {
    try {
      // Use a free text summarization model
      const response = await fetch(
        'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: text.substring(0, 1000), // Limit text length
            parameters: {
              max_length: 150,
              min_length: 50,
              do_sample: false
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`)
      }

      const result = await response.json()
      return result[0]?.summary_text || 'Summary generation failed'
    } catch (error) {
      console.error('AI summary generation failed:', error)
      // Fallback: return a simple summary based on text length
      return this.generateSimpleSummary(text)
    }
  }

  // Simple fallback summary (completely free, no API needed)
  private static generateSimpleSummary(text: string): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10)
    const wordCount = text.split(/\s+/).length
    
    if (wordCount <= 50) return text
    
    // Take first 2-3 sentences as summary
    const summarySentences = sentences.slice(0, Math.min(3, Math.ceil(sentences.length * 0.3)))
    return summarySentences.join('. ') + '.'
  }

  // Generate brief content (free alternative)
  static async generateBrief(prompt: string): Promise<string> {
    try {
      // Use a free text generation model
      const response = await fetch(
        'https://api-inference.huggingface.co/models/gpt2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_length: 200,
              temperature: 0.7,
              do_sample: true
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`)
      }

      const result = await response.json()
      return result[0]?.generated_text || 'Content generation failed'
    } catch (error) {
      console.error('AI content generation failed:', error)
      // Fallback: return a template-based response
      return this.generateTemplateBrief(prompt)
    }
  }

  // Template-based fallback (completely free)
  private static generateTemplateBrief(prompt: string): string {
    const templates = [
      `Based on the request for "${prompt}", here are some key points to consider:`,
      `For "${prompt}", focus on these essential elements:`,
      `When addressing "${prompt}", remember to include:`,
      `Key considerations for "${prompt}":`
    ]
    
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
    return randomTemplate + ' Research thoroughly, engage authentically, and measure results consistently.'
  }
}
