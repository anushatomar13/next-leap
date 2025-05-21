'use client'

import { useEffect, useState } from 'react'
import { supabase, getUserData } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import AuthModal from '../components/AuthModal'

export default function LandingPage() {
  const [user, setUser] = useState(null)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    async function loadUser() {
      const user = await getUserData()
      if (user) setUser(user)
    }
    loadUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center">
      <header className="w-full flex justify-end mb-6">
        {user ? (
          <div className="space-x-4">
            <span>Hi, {user.user_metadata.full_name || user.email}</span>
            <button onClick={handleSignOut} className="text-sm text-red-600 hover:underline">Sign Out</button>
          </div>
        ) : (
          <button onClick={() => setShowAuth(true)} className="text-sm text-blue-600 hover:underline">Sign In / Sign Up</button>
        )}
      </header>

      <h1 className="text-4xl font-bold mb-4">Welcome to NextLeap</h1>
      <p className="text-lg mb-8 text-gray-600">Your personalized AI-powered career roadmap tool.</p>

      {user && (
        <button
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          onClick={() => window.location.href = '/create-roadmap'}
        >
          Generate Your Roadmap
        </button>
      )}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </main>
  )
}
