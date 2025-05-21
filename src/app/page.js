'use client'

import { useState, useEffect } from 'react'
import { supabase, getUserData } from '@/lib/supabase/client'
import AuthModal from '@/components/AuthModal'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserData()
      setUser(data)
    }
    fetchUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">NextLeap</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span>Hello, {user.user_metadata?.full_name || user.email}</span>
              <button onClick={handleSignOut} className="text-sm text-red-600 underline">Sign out</button>
            </div>
          ) : (
            <button onClick={() => setShowAuth(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Sign In / Sign Up</button>
          )}
        </div>
      </div>

      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">AI-powered Career Roadmaps</h2>
        <p className="mb-6">Plan your career path from where you are to where you want to be.</p>
        <button
          onClick={() => router.push('/generate')}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Generate Your Roadmap
        </button>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </main>
  )
}
