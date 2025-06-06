// middleware.ts - TEMPORARY DISABLE
// Comment out or replace your middleware.ts with this temporarily

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // TEMPORARILY DISABLED - just let all requests through
  console.log('🔄 Middleware disabled - allowing all requests:', req.nextUrl.pathname);
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Only match a few specific paths to minimize interference
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|api).*)',
  ],
}