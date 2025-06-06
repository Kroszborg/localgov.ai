// middleware.ts - TEMPORARY DISABLE
// Comment out or replace your middleware.ts with this temporarily

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiter (for demo; use Redis in production)
const rateLimitMap = new Map();
const RATE_LIMIT = 30; // max 30 requests
const WINDOW_MS = 60 * 1000; // per minute

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { pathname } = req.nextUrl;

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes
  const protectedRoutes = ['/dashboard', '/settings'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = pathname.startsWith('/auth/');

  // If user is not signed in and trying to access a protected route
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/auth/signin', req.url);
    redirectUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is signed in and trying to access auth routes
  if (isAuthRoute && session) {
    const redirectUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Block admin and private API
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/private')) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Rate limit /api/ endpoints
  if (pathname.startsWith('/api/')) {
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, start: now };
    if (now - entry.start > WINDOW_MS) {
      rateLimitMap.set(ip, { count: 1, start: now });
    } else {
      if (entry.count >= RATE_LIMIT) {
        return new NextResponse('Too Many Requests', { status: 429 });
      }
      rateLimitMap.set(ip, { count: entry.count + 1, start: entry.start });
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/auth/:path*',
  ],
}