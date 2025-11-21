import { NextRequest, NextResponse } from 'next/server'
import { generateAIText } from '@/lib/ai-service'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, userId } = await request.json()

    if (!prompt || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate AI response
    const aiResponse = await generateAIText({
      prompt,
      userId,
      maxTokens: 500,
    })

    // Store the request in the database
    await supabaseAdmin.from('ai_requests').insert({
      user_id: userId,
      request_type: 'text_generation',
      prompt,
      response: aiResponse.text,
      tokens_used: aiResponse.tokensUsed,
    })

    return NextResponse.json({
      response: aiResponse.text,
      tokensUsed: aiResponse.tokensUsed,
      model: aiResponse.model,
    })
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI response' },
      { status: 500 }
    )
  }
}


