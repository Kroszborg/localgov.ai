// middleware.ts - TEMPORARY DISABLE
// Comment out or replace your middleware.ts with this temporarily

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiter (for demo; use Redis in production)
const rateLimitMap = new Map();
const RATE_LIMIT = 30; // max 30 requests
const WINDOW_MS = 60 * 1000; // per minute

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only match a few specific paths to minimize interference
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|api).*)',
    '/api/:path*',
    '/admin/:path*',
  ],
}