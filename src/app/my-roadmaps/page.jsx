'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserData, getUserRoadmaps } from '@/lib/supabase/client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function MyRoadmapsPage() {
  const [user, setUser] = useState(null)
  const [roadmaps, setRoadmaps] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const currentUser = await getUserData()
      if (!currentUser) {
        router.push('/')
        return
      }
      setUser(currentUser)
      try {
        const data = await getUserRoadmaps(currentUser.id)
        setRoadmaps(data)
      } catch (err) {
        console.error('Error fetching roadmaps:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [router])

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          My Roadmaps
        </h1>
        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : roadmaps.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <p className="text-gray-300">
              No roadmaps found. <Link href="/generate" className="text-blue-400 hover:text-blue-300">Create one!</Link>
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {roadmaps.map((roadmap, index) => (
              <motion.li
                key={roadmap.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-800 hover:bg-gray-750 transition-colors rounded-lg p-4 shadow-lg border border-gray-700 cursor-pointer"
                onClick={() => router.push(`/roadmap/${roadmap.id}`)}
              >
                <h2 className="text-lg font-semibold text-white mb-1">
                  {roadmap.current_job} → {roadmap.target_job}
                </h2>
                <p className="text-sm text-gray-400 mb-1">
                  Timeframe: {roadmap.timeframe}
                </p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(roadmap.created_at).toLocaleString()}
                </p>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </main>
  )
}
