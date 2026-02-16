import { NextRequest, NextResponse } from 'next/server'
import { createParser } from 'eventsource-parser'
import { responseCache, generateCacheKey } from '@/lib/cache'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set')
}

const apiKey = process.env.GEMINI_API_KEY

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

export async function POST(request: NextRequest) {
  try {
    const { query, location } = await request.json()

    if (!query || !location) {
      return NextResponse.json(
        { error: 'Query and location are required' },
        { status: 400 }
      )
    }

    // Check cache first
    const cacheKey = generateCacheKey(query, location)
    const cachedResponse = responseCache.get(cacheKey)

    if (cachedResponse) {
      // Return cached response as stream for consistency
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          // Send cached content
          const sseData = `data: ${JSON.stringify({ text: cachedResponse })}\n\n`
          controller.enqueue(encoder.encode(sseData))
          // Send completion signal
          controller.enqueue(encoder.encode('data: {"done": true, "cached": true}\n\n'))
          controller.close()
        }
      })

      return new NextResponse(stream, {
        status: 200,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          'X-Cache': 'HIT',
        },
      })
    }

    const userPrompt = `I have a question about local laws in ${location}. Please help me understand: ${query}

Please provide a clear explanation in plain English, include relevant disclaimers, and suggest where I might find official sources for verification. If you don't have specific information about ${location}, please provide general guidance for similar jurisdictions and tell me where to find local-specific information.`

    // Prepare the request body for Gemini REST API with streaming
    const requestBody = {
      contents: [
        {
          parts: [{ text: systemPrompt }],
          role: 'user',
        },
        {
          parts: [{ text: 'I understand. I will act as your local government law assistant.' }],
          role: 'model',
        },
        {
          parts: [{ text: userPrompt }],
          role: 'user',
        },
      ],
      generationConfig: {
        maxOutputTokens: 1200,
        temperature: 0.7,
      },
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        let accumulatedResponse = ''
        try {
          const parser = createParser({
            onEvent: (event) => {
              try {
                const data = JSON.parse(event.data)
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
                if (text) {
                  accumulatedResponse += text
                  // Send as Server-Sent Event format
                  const sseData = `data: ${JSON.stringify({ text })}\n\n`
                  controller.enqueue(encoder.encode(sseData))
                }
              } catch (parseError) {
                console.error('Parse error:', parseError)
              }
            },
          })

          if (!response.body) {
            throw new Error('No response body')
          }

          const reader = response.body.getReader()
          const decoder = new TextDecoder()

          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            parser.feed(decoder.decode(value))
          }

          // Cache the complete response
          if (accumulatedResponse) {
            responseCache.set(cacheKey, accumulatedResponse)
          }

          // Send completion signal
          controller.enqueue(encoder.encode('data: {"done": true}\n\n'))
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          const errorData = `data: ${JSON.stringify({ error: 'Stream error occurred' })}\n\n`
          controller.enqueue(encoder.encode(errorData))
          controller.close()
        }
      },
    })

    return new NextResponse(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'X-Cache': 'MISS',
      },
    })
  } catch (error: any) {
    console.error('Error in search API:', error)
    console.error('Error details:', error?.message, error?.status)

    // Provide more specific error message for debugging
    const errorMessage = error?.message || 'An error occurred while processing your request'

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}