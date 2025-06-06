import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const locationMap: { [key: string]: string } = {
  'new-york-ny': 'New York, New York',
  'los-angeles-ca': 'Los Angeles, California',
  'chicago-il': 'Chicago, Illinois',
  'houston-tx': 'Houston, Texas',
  'phoenix-az': 'Phoenix, Arizona',
  'philadelphia-pa': 'Philadelphia, Pennsylvania',
  'san-antonio-tx': 'San Antonio, Texas',
  'san-diego-ca': 'San Diego, California',
  'dallas-tx': 'Dallas, Texas',
  'san-jose-ca': 'San Jose, California',
}

export async function POST(request: NextRequest) {
  try {
    const { query, location } = await request.json()

    if (!query || !location) {
      return NextResponse.json(
        { error: 'Query and location are required' },
        { status: 400 }
      )
    }

    const locationName = locationMap[location] || location
    
    const systemPrompt = `You are a helpful AI assistant specializing in explaining local government laws and policies in plain English. Your role is to:

1. Provide clear, accurate information about local laws and regulations
2. Explain legal concepts in simple, everyday language
3. Always include appropriate disclaimers about legal advice
4. Cite general sources when possible (city websites, municipal codes, etc.)
5. Be helpful while being appropriately cautious about legal interpretation

IMPORTANT DISCLAIMERS TO INCLUDE:
- This information is for general guidance only
- This is not legal advice
- Laws can change frequently
- Always verify current regulations with official sources
- Consult a qualified attorney for specific legal matters

Focus on being helpful, accurate, and clear while maintaining appropriate legal disclaimers.`

    const userPrompt = `I have a question about local laws in ${locationName}. Please help me understand: ${query}

Please provide a clear explanation in plain English, include relevant disclaimers, and suggest where I might find official sources for verification.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 1000,
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