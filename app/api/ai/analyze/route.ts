import { NextRequest, NextResponse } from 'next/server'
import { analyzeText } from '@/lib/ai-service'
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

    // Analyze text
    const aiResponse = await analyzeText(prompt, userId)

    // Store the request in the database
    await supabaseAdmin.from('ai_requests').insert({
      user_id: userId,
      request_type: 'text_analysis',
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
    console.error('AI analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze text' },
      { status: 500 }
    )
  }
}


