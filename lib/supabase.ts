import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  cookies: {
    name: 'sb-auth-token',
    lifetime: 60 * 60 * 24 * 7, // 7 days
    domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : 'localhost',
    path: '/',
    sameSite: 'lax',
  },
})