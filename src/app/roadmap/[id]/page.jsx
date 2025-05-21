'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getRoadmapById } from '@/lib/supabase/client'
import jsPDF from 'jspdf'

export default function RoadmapDetailPage() {
  const { id } = useParams()
  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchRoadmap() {
      try {
        const data = await getRoadmapById(id)
        if (!data) {
          router.push('/my-roadmaps')
          return
        }
        setRoadmap(data)
      } catch (err) {
        console.error('Failed to load roadmap', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRoadmap()
  }, [id, router])

  const downloadPDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.text('Career Roadmap', 20, 20)

    doc.setFontSize(12)
    doc.text(`Current Job: ${roadmap.current_job}`, 20, 40)
    doc.text(`Target Role: ${roadmap.target_job}`, 20, 50)
    doc.text(`Timeframe: ${roadmap.timeframe}`, 20, 60)

    doc.text('Roadmap Steps:', 20, 80)

    const steps = roadmap.roadmap_content.split('\n').filter(Boolean)
    steps.forEach((step, index) => {
      doc.text(`${index + 1}. ${step.trim()}`, 25, 90 + index * 10)
    })

    doc.save(`nextleap_roadmap_${roadmap.id}.pdf`)
  }

  if (loading) return <p className="p-6">Loading roadmap...</p>
  if (!roadmap) return <p className="p-6">Roadmap not found.</p>

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Career Roadmap</h1>

      <div className="space-y-2">
        <p><strong>Current Job:</strong> {roadmap.current_job}</p>
        <p><strong>Target Role:</strong> {roadmap.target_job}</p>
        <p><strong>Timeframe:</strong> {roadmap.timeframe}</p>
        <p className="whitespace-pre-line mt-4 border p-4 rounded bg-gray-50">
          {roadmap.roadmap_content}
        </p>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Download as PDF
      </button>
    </main>
  )
}
