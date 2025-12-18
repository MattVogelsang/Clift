'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/auth-store'
import { supabase } from '@/lib/supabase'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const checkUser = useAuthStore((state) => state.checkUser)
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    checkUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        // Sync session to cookies for server-side API routes
        if (session?.access_token) {
          // Set the access token as a cookie
          document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
          // Also set the refresh token
          if (session.refresh_token) {
            document.cookie = `sb-refresh-token=${session.refresh_token}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
          }
        } else {
          // Clear cookies on sign out
          document.cookie = 'sb-access-token=; path=/; max-age=0'
          document.cookie = 'sb-refresh-token=; path=/; max-age=0'
        }
      }
    )

    // Also sync current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.access_token) {
        document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
        if (session.refresh_token) {
          document.cookie = `sb-refresh-token=${session.refresh_token}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
        }
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [checkUser, setUser])

  return <>{children}</>
}


