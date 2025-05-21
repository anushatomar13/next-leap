'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { getRoadmapById } from '@/lib/supabase/client'
import MermaidRenderer from '@/components/MermaidRenderer'
import Header from '@/components/Navbar'

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

  return (
    <main className="min-h-screen bg-gray-900">
      <Header /> 
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        {!roadmap ? (
          <p className="text-gray-300 text-center">Loading roadmap...</p>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                {roadmap.current_job} → {roadmap.target_job}
              </h1>
              <div className="flex items-center space-x-4 text-gray-400">
                <p className="text-sm">
                  Timeframe: <span className="text-blue-400">{roadmap.timeframe}</span>
                </p>
                <span className="text-gray-600">•</span>
                <p className="text-xs">
                  Created: {new Date(roadmap.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-700"
            >
              <div className="mermaid-container">
                <MermaidRenderer chart={roadmap.roadmap_content} />
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </main>
  )
}
