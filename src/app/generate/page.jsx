'use client'
import { useState } from 'react'
import MermaidRenderer from '@/components/MermaidRenderer'
import { getUserData,saveRoadmap } from '@/lib/supabase/client'

export default function GeneratePage() {
  const [currentJob, setCurrentJob] = useState('')
  const [targetJob, setTargetJob] = useState('')
  const [timeframe, setTimeframe] = useState('')
  const [loading, setLoading] = useState(false)
  const [mermaidCode, setMermaidCode] = useState('')

  const handleGenerate = async () => {
    setLoading(true)
    setMermaidCode('')
    try {
      const res = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentJob, targetJob, timeframe }),
      })
      const data = await res.json()
      const user = await getUserData()
if (user) {
  await saveRoadmap(user.id, {
    currentJob,
    targetJob,
    timeframe,
    content: aiMermaid
  })
}
      const aiMermaid = data.mermaid
      setMermaidCode(aiMermaid)
    } catch (err) {
      console.error('Error generating roadmap', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generate AI-Powered Career Roadmap</h1>
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Current Job (e.g., Teacher)"
          value={currentJob}
          onChange={(e) => setCurrentJob(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Target Role (e.g., Frontend Developer)"
          value={targetJob}
          onChange={(e) => setTargetJob(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Timeframe (e.g., 6 months)"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Roadmap'}
        </button>
      </div>

      {mermaidCode && (
        <div className="mt-8 border rounded p-4 bg-white shadow">
          <MermaidRenderer chart={mermaidCode} />
        </div>
      )}
    </main>
  )
}
