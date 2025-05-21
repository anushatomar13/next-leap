// middleware.js
import { createSupabaseClient } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

// Protect these routes
const protectedPaths = [
  '/create-roadmap',
  '/my-roadmaps',
  '/roadmap',
]

export async function middleware(req) {
  const { pathname } = req.nextUrl

  // Only protect paths that match
  if (!protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const supabase = createSupabaseClient()
  const token = req.cookies.get('sb-access-token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Optionally: validate token using Supabase (not required for simple protection)

  return NextResponse.next()
}
