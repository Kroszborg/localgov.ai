import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    // Refresh session if expired - required for Server Components
    const {
      data: { session },
    } = await supabase.auth.getSession()

    console.log('Middleware - Session:', session ? 'Found' : 'Not found')
    console.log('Middleware - Path:', req.nextUrl.pathname)

    // If user is not signed in and the current path is not /auth/signin or /auth/signup
    // redirect the user to /auth/signin
    if (!session && !req.nextUrl.pathname.startsWith('/auth/')) {
      console.log('Middleware - Redirecting to signin')
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/auth/signin'
      return NextResponse.redirect(redirectUrl)
    }

    // If user is signed in and the current path is /auth/signin or /auth/signup
    // redirect the user to /dashboard
    if (session && req.nextUrl.pathname.startsWith('/auth/')) {
      console.log('Middleware - Redirecting to dashboard')
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/dashboard'
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (error) {
    console.error('Middleware Error:', error)
    // If there's an error, redirect to signin
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    return NextResponse.redirect(redirectUrl)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     * - auth callback routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api|auth/callback).*)',
  ],
}