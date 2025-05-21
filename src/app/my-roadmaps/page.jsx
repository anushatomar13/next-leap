'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserData,getUserRoadmaps } from '@/lib/supabase/client'


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
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Career Roadmaps</h1>

      {loading ? (
        <p>Loading...</p>
      ) : roadmaps.length === 0 ? (
        <p>No roadmaps found. Go create one!</p>
      ) : (
        <ul className="space-y-4">
          {roadmaps.map((roadmap) => (
            <li
              key={roadmap.id}
              className="border rounded p-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => router.push(`/roadmap/${roadmap.id}`)}
            >
              <h2 className="text-lg font-semibold">{roadmap.current_job} → {roadmap.target_job}</h2>
              <p className="text-sm text-gray-600">Timeframe: {roadmap.timeframe}</p>
              <p className="text-xs text-gray-500">Created: {new Date(roadmap.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
