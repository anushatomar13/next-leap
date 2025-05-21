import { supabase } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

const protectedPaths = [
  '/create-roadmap',
  '/my-roadmaps',
  '/roadmap',
]

export async function middleware(req) {
  const { pathname } = req.nextUrl
  
  if (!protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }
  
  // Use the already-created supabase instance instead of creating a new one
  const token = req.cookies.get('sb-access-token')?.value
  
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  
  // Optionally: validate token using Supabase (not required for simple protection)
  return NextResponse.next()
}