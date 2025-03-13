import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

// Simple in-memory rate limiting
// In production, use Redis or another distributed store
const RATE_LIMIT_DURATION = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_IP = 20 // Max requests per minute
const ipRequestMap = new Map<string, { count: number; timestamp: number }>()

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check auth status
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/profile"]

  // API routes that need rate limiting
  const apiRoutes = ["/api/daily-challenge"]

  // Check if the route is protected and user is not authenticated
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !session) {
    // Redirect to login page
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is already logged in and tries to access login/signup pages, redirect to dashboard
  if ((req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup") && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Rate limiting for API routes
  if (apiRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    const ip = req.ip || "unknown"
    const now = Date.now()
    const ipData = ipRequestMap.get(ip) || { count: 0, timestamp: now }

    // Reset count if the time window has passed
    if (now - ipData.timestamp > RATE_LIMIT_DURATION) {
      ipData.count = 0
      ipData.timestamp = now
    }

    ipData.count++
    ipRequestMap.set(ip, ipData)

    // Set rate limit headers
    res.headers.set("X-RateLimit-Limit", MAX_REQUESTS_PER_IP.toString())
    res.headers.set("X-RateLimit-Remaining", Math.max(0, MAX_REQUESTS_PER_IP - ipData.count).toString())

    // If rate limit exceeded
    if (ipData.count > MAX_REQUESTS_PER_IP) {
      return new NextResponse(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      })
    }
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/signup", "/api/:path*"],
}

