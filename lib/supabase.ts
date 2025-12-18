import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Validate environment variables
if (typeof window !== 'undefined') {
  // Client-side: log if using placeholders
  if (supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder')) {
    console.error('❌ Supabase environment variables are missing or not loaded!')
    console.error('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing')
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing')
  } else {
    // Log the actual URL being used (for debugging)
    console.log('🔗 Using Supabase URL:', supabaseUrl.replace(/\/\/.*@/, '//***@')) // Hide credentials if any
  }
}

export const supabase = createClient<Database, 'public'>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    fetch: (url, options = {}) => {
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
        },
      }).catch((error) => {
        console.error('Supabase fetch error:', error)
        throw new Error('Failed to connect to authentication service. Please check your internet connection.')
      })
    },
  },
})

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          subscription_status: string | null
          subscription_tier: string | null
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          subscription_status?: string | null
          subscription_tier?: string | null
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          subscription_status?: string | null
          subscription_tier?: string | null
          stripe_customer_id?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          email: string
          phone: string | null
          linkedin_url: string | null
          resume_url: string | null
          resume_text: string | null
          skills: string[] | null
          experience_years: number | null
          experience_summary: string | null
          job_title_target: string | null
          location_preference: string | null
          remote_preference: string | null
          salary_min: number | null
          salary_max: number | null
          industries: string[] | null
          experience_level: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          email: string
          phone?: string | null
          linkedin_url?: string | null
          resume_url?: string | null
          resume_text?: string | null
          skills?: string[] | null
          experience_years?: number | null
          experience_summary?: string | null
          job_title_target?: string | null
          location_preference?: string | null
          remote_preference?: string | null
          salary_min?: number | null
          salary_max?: number | null
          industries?: string[] | null
          experience_level?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          email?: string
          phone?: string | null
          linkedin_url?: string | null
          resume_url?: string | null
          resume_text?: string | null
          skills?: string[] | null
          experience_years?: number | null
          experience_summary?: string | null
          job_title_target?: string | null
          location_preference?: string | null
          remote_preference?: string | null
          salary_min?: number | null
          salary_max?: number | null
          industries?: string[] | null
          experience_level?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_listings: {
        Row: {
          id: string
          user_id: string
          external_id: string
          title: string
          company: string
          location: string | null
          salary: string | null
          description: string | null
          requirements: string[] | null
          source: string
          url: string
          match_score: number | null
          posted_date: string | null
          scraped_at: string
          is_applied: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          external_id: string
          title: string
          company: string
          location?: string | null
          salary?: string | null
          description?: string | null
          requirements?: string[] | null
          source: string
          url: string
          match_score?: number | null
          posted_date?: string | null
          scraped_at?: string
          is_applied?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          external_id?: string
          title?: string
          company?: string
          location?: string | null
          salary?: string | null
          description?: string | null
          requirements?: string[] | null
          source?: string
          url?: string
          match_score?: number | null
          posted_date?: string | null
          scraped_at?: string
          is_applied?: boolean
          created_at?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          id: string
          user_id: string
          job_id: string
          cover_letter: string | null
          status: string
          applied_at: string
          status_updated_at: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_id: string
          cover_letter?: string | null
          status?: string
          applied_at?: string
          status_updated_at?: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_id?: string
          cover_letter?: string | null
          status?: string
          applied_at?: string
          status_updated_at?: string
          notes?: string | null
          created_at?: string
        }
        Relationships: []
      }
      ai_requests: {
        Row: {
          id: string
          user_id: string
          request_type: string
          prompt: string
          response: string
          tokens_used: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          request_type: string
          prompt: string
          response: string
          tokens_used?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          request_type?: string
          prompt?: string
          response?: string
          tokens_used?: number | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      user_application_stats: {
        Row: {
          user_id: string
          total_applications: number
          profile_views: number
          responses: number
          offers: number
          rejections: number
          response_rate: number
        }
        Relationships: []
      }
    }
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}

