import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: {
      getItem: (key: string) => {
        if (typeof window === 'undefined') return null
        try {
          return window.localStorage.getItem(key)
        } catch {
          return null
        }
      },
      setItem: (key: string, value: string) => {
        if (typeof window === 'undefined') return
        try {
          window.localStorage.setItem(key, value)
        } catch {
          // Handle storage errors gracefully
        }
      },
      removeItem: (key: string) => {
        if (typeof window === 'undefined') return
        try {
          window.localStorage.removeItem(key)
        } catch {
          // Handle storage errors gracefully
        }
      },
    },
  }
})