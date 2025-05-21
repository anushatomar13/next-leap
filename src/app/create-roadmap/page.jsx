'use client'

import { useEffect, useState } from 'react'
import { getUserData, saveRoadmap } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function CreateRoadmapPage() {
  const [currentJob, setCurrentJob] = useState('')
  const [targetJob, setTargetJob] = useState('')
  const [timeframe, setTimeframe] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserData()
      if (!user) router.push('/')
      else setUser(user)
    }
    fetchUser()
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulated AI roadmap (replace with real Groq + LLaMA3 call later)
    const fakeRoadmap = `
      1. Learn basics of ${targetJob}
      2. Take online courses (e.g., freeCodeCamp, Coursera)
      3. Build 3 projects relevant to ${targetJob}
      4. Start applying for internships or junior roles
      5. Reach goal in ${timeframe}
    `

    try {
      await saveRoadmap(user.id, {
        currentJob,
        targetJob,
        timeframe,
        content: fakeRoadmap,
      })
      alert('Roadmap generated and saved!')
      router.push('/my-roadmaps') 
    } catch (err) {
      alert('Error saving roadmap. Check console.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Your Career Roadmap</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Current Job</label>
          <input
            type="text"
            value={currentJob}
            onChange={(e) => setCurrentJob(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Dream Role</label>
          <input
            type="text"
            value={targetJob}
            onChange={(e) => setTargetJob(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Timeframe (e.g., 6 months)</label>
          <input
            type="text"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Generating...' : 'Generate Roadmap'}
        </button>
      </form>
    </main>
  )
}
