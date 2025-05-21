'use client'

import { useEffect, useState } from 'react'
import { supabase, getUserData } from '../supabaseClient'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getUserData()
      setUser(currentUser)
    }
    loadUser()
  }, [])

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
    if (error) console.error('Login error:', error)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <main className="p-6">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">NextLeap</h1>
        {user ? (
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        ) : (
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Sign In / Sign Up</button>
        )}
      </header>

      <section className="text-center mt-20">
        <h2 className="text-2xl">
          {user ? `Hi, ${user.user_metadata.full_name || user.email}!` : 'Welcome to NextLeap 🚀'}
        </h2>
        {user && (
          <button
            onClick={() => router.push('/create-roadmap')}
            className="mt-8 bg-green-600 text-white px-6 py-3 rounded text-lg"
          >
            Generate Your Roadmap
          </button>
        )}
      </section>
    </main>
  )
}
