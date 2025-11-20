import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient<Database, 'public'>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
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
      ai_requests: {
        Row: {
          id: string
          user_id: string
          prompt: string
          response: string
          created_at: string
          tokens_used: number | null
        }
        Insert: {
          id?: string
          user_id: string
          prompt: string
          response: string
          created_at?: string
          tokens_used?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          prompt?: string
          response?: string
          created_at?: string
          tokens_used?: number | null
        }
        Relationships: []
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}

