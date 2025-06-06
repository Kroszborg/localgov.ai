import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { query, location } = await request.json()

    if (!query || !location) {
      return NextResponse.json(
        { error: 'Query and location are required' },
        { status: 400 }
      )
    }

    // Enhanced system prompt for better location handling
    const systemPrompt = `You are a helpful AI assistant specializing in explaining local government laws and policies in plain English. Your role is to:

1. Provide clear, accurate information about local laws and regulations for the specific location mentioned
2. Explain legal concepts in simple, everyday language
3. Always include appropriate disclaimers about legal advice
4. Cite general sources when possible (city websites, municipal codes, state laws, etc.)
5. Be helpful while being appropriately cautious about legal interpretation
6. If you don't have specific information about the exact location, provide general guidance and suggest where to find local information

IMPORTANT DISCLAIMERS TO INCLUDE:
- This information is for general guidance only
- This is not legal advice
- Laws can change frequently and vary by jurisdiction
- Always verify current regulations with official local sources
- Consult a qualified attorney for specific legal matters

LOCATION HANDLING:
- Acknowledge the specific location provided
- If it's a major city, provide city-specific information when possible
- If it's a smaller location, provide state/county level guidance
- Always suggest checking with local government offices for the most current information

Focus on being helpful, accurate, and clear while maintaining appropriate legal disclaimers.`

    const userPrompt = `I have a question about local laws in ${location}. Please help me understand: ${query}

Please provide a clear explanation in plain English, include relevant disclaimers, and suggest where I might find official sources for verification. If you don't have specific information about ${location}, please provide general guidance for similar jurisdictions and tell me where to find local-specific information.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 1200,
      temperature: 0.7,
    })

    const result = completion.choices[0]?.message?.content || 
      "I apologize, but I couldn't generate a response at this time. Please try again later."

    return NextResponse.json({ result })

  } catch (error) {
    console.error('Error in search API:', error)
    
    // Don't expose internal errors to the client
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}