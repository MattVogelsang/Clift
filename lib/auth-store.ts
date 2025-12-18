import { create } from 'zustand'
import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: Error | null }>
  checkUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  
  setUser: (user) => set({ user, loading: false }),
  
  signIn: async (email, password) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (!error && data.user) {
        set({ user: data.user, loading: false })
      }
      
      return { error }
    } catch (err: any) {
      console.error('Sign in error:', err)
      return { 
        error: err instanceof Error 
          ? err 
          : new Error(err?.message || 'Failed to connect to authentication service. Please check your internet connection.') 
      }
    }
  },
  
  signUp: async (email, password) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      return { error }
    } catch (err: any) {
      console.error('Sign up error:', err)
      return { 
        error: err instanceof Error 
          ? err 
          : new Error(err?.message || 'Failed to connect to authentication service. Please check your internet connection.') 
      }
    }
  },
  
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null })
  },
  
  resetPassword: async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password`,
      })
      
      return { error }
    } catch (err: any) {
      console.error('Reset password error:', err)
      return { 
        error: err instanceof Error 
          ? err 
          : new Error(err?.message || 'Failed to connect to authentication service. Please check your internet connection.') 
      }
    }
  },
  
  checkUser: async () => {
    try {
      const { data, error } = await supabase.auth.getUser()
      set({ user: data.user, loading: false })
      if (error) {
        console.error('Check user error:', error)
      }
    } catch (err: any) {
      console.error('Check user error:', err)
      set({ user: null, loading: false })
    }
  },
}))


