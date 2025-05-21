'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getRoadmapById } from '@/lib/supabase/client'
import MermaidRenderer from '@/components/MermaidRenderer'

export default function RoadmapDetailPage() {
  const { id } = useParams()
  const [roadmap, setRoadmap] = useState(null)

  useEffect(() => {
    async function fetchRoadmap() {
      const data = await getRoadmapById(id)
      setRoadmap(data)
    }
    fetchRoadmap()
  }, [id])

  if (!roadmap) return <p className="p-6">Loading...</p>

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-2">
        {roadmap.current_job} → {roadmap.target_job}
      </h1>
      <p className="text-sm text-gray-600 mb-4">Timeframe: {roadmap.timeframe}</p>
      <MermaidRenderer chart={roadmap.roadmap_content} />
    </main>
  )
}
