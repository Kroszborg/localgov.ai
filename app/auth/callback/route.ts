import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const error = requestUrl.searchParams.get('error')
    const error_description = requestUrl.searchParams.get('error_description')

    // Handle auth errors
    if (error) {
      console.error('Auth error:', error, error_description)
      return NextResponse.redirect(new URL('/auth/signin?error=auth_error', requestUrl.origin))
    }

    // Handle missing code
    if (!code) {
      console.error('No auth code provided')
      return NextResponse.redirect(new URL('/auth/signin?error=no_code', requestUrl.origin))
    }

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Exchange the code for a session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (exchangeError) {
      console.error('Code exchange error:', exchangeError)
      return NextResponse.redirect(new URL('/auth/signin?error=exchange_failed', requestUrl.origin))
    }

    if (data.session && data.user) {
      // Successful authentication - redirect to dashboard
      const response = NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
      
      // Set secure headers
      response.headers.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate')
      response.headers.set('Pragma', 'no-cache')
      
      return response
    }

    // No session created
    console.error('No session created after code exchange')
    return NextResponse.redirect(new URL('/auth/signin?error=no_session', requestUrl.origin))

  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(new URL('/auth/signin?error=callback_error', request.url))
  }
}