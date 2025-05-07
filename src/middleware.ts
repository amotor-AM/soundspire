import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add cache control headers for static assets
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|webp|gif|ico|svg|css|js)$/)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
  }

  return response
}

export const config = {
  matcher: [
    '/images/:path*',
    '/_next/static/:path*',
    '/favicon.ico',
    '/manifest.json',
  ],
} 