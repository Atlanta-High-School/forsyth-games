import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Relaxed Content Security Policy for better game compatibility
  const cspDirectives = [
    "default-src 'self' https: data: blob:",
    // Script sources - allow self, inline (for Next.js), eval (for games), and CDNs
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob: data:",
    // Worker sources
    "worker-src 'self' blob:",
    // Object sources
    "object-src 'self' https: data:",
    // Style sources
    "style-src 'self' 'unsafe-inline' https:",
    // Image sources - allow all HTTPS and data URIs
    "img-src 'self' data: https: blob:",
    // Font sources
    "font-src 'self' data: https:",
    // Connect sources - allow HTTPS connections
    "connect-src 'self' https: wss: blob: data:",
    // Media sources
    "media-src 'self' https: blob: data:",
    // Frame sources - allow games and required services
    "frame-src 'self' https:",
    // Restrict framing to prevent clickjacking
    "frame-ancestors 'self'"
  ]
  
  response.headers.set(
    'Content-Security-Policy',
    cspDirectives.join('; ')
  )
  
  // Basic security headers
  response.headers.set(
    'X-Content-Type-Options',
    'nosniff'
  )
  
  response.headers.set(
    'Referrer-Policy',
    'no-referrer-when-downgrade'
  )
  
  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
