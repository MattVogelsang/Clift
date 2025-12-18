'use client'

import { useState } from 'react'
import { useAuthStore } from '@/lib/auth-store'

export function AIInterface() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'generate' | 'analyze'>('generate')
  
  const user = useAuthStore((state) => state.user)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setError('')
    setLoading(true)
    setResponse('')

    try {
      const endpoint = mode === 'generate' ? '/api/ai/generate' : '/api/ai/analyze'
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          userId: user?.id,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to process request')
      }

      setResponse(data.response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">AI Service</h2>
        
        {/* Mode Selector */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setMode('generate')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
              mode === 'generate'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Generate Text
          </button>
          <button
            onClick={() => setMode('analyze')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
              mode === 'analyze'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Analyze Text
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'generate' ? 'What would you like to generate?' : 'Enter text to analyze'}
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={8}
              className="input-field resize-none"
              placeholder={
                mode === 'generate'
                  ? 'e.g., Write a blog post about artificial intelligence...'
                  : 'Paste the text you want to analyze...'
              }
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              `${mode === 'generate' ? 'Generate' : 'Analyze'}`
            )}
          </button>
        </form>
      </div>

      {/* Output Section */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Response</h2>
        
        {response ? (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="whitespace-pre-wrap text-gray-800">{response}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(response)
              }}
              className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-semibold"
            >
              Copy to Clipboard
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-12 border border-gray-200 text-center">
            <div className="text-6xl mb-4">🤖</div>
            <p className="text-gray-500">
              Your AI-generated content will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


