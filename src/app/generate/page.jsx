'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import MermaidRenderer from '@/components/MermaidRenderer'
import { getUserData, saveRoadmap } from '@/lib/supabase/client'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas-pro';  
import Link from 'next/link'

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
      const aiMermaid = data.mermaid

      const user = await getUserData()
      if (user) {
        await saveRoadmap(user.id, {
          currentJob,
          targetJob,
          timeframe,
          content: aiMermaid,
        })
      }
      setMermaidCode(aiMermaid)
    } catch (err) {
      console.error('Error generating roadmap', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePDFDownload = async () => {
    const chartElement = document.querySelector('.mermaid')
    if (!chartElement) {
      alert('No flowchart to export.')
      return
    }
    chartElement.style.backgroundColor = '#000000'
    const canvas = await html2canvas(chartElement, {
      backgroundColor: '#000000',
      scale: 2,
    })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    pdf.setFillColor(0, 0, 0)
    pdf.rect(0, 0, pageWidth, pageHeight, 'F')
    const borderPadding = 20
    pdf.setDrawColor(255, 204, 0)
    pdf.setLineWidth(4)
    pdf.rect(borderPadding, borderPadding, pageWidth - 2 * borderPadding, pageHeight - 2 * borderPadding)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(18)
    pdf.setTextColor(255, 255, 255)
    pdf.text('Roadmap by Next Leap', pageWidth / 2, 50, { align: 'center' })
    const scale = Math.min((pageWidth - 100) / canvas.width, (pageHeight - 200) / canvas.height)
    const imgWidth = canvas.width * scale
    const imgHeight = canvas.height * scale
    const x = (pageWidth - imgWidth) / 2
    const y = (pageHeight - imgHeight) / 2 + 20
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight)
    pdf.setFont('times', 'italic')
    pdf.setFontSize(12)
    pdf.setTextColor(180, 180, 180)
    pdf.save('career-roadmap.pdf')
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200">
      {/* Improved Navbar */}
      <motion.header 
        className="fixed w-full top-0 z-50 bg-gray-800 backdrop-blur-sm bg-opacity-90 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">NextLeap</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="#about" className="text-gray-300 hover:text-white transition">About</Link>
              <Link href="#features" className="text-gray-300 hover:text-white transition">Features</Link>
              <Link href="#testimonials" className="text-gray-300 hover:text-white transition">Testimonials</Link>
            </nav>
            {/* User/Sign In Button (placeholder) */}
            <div className="flex items-center gap-4">
              {/* Replace with your user/sign-in logic */}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Generate AI-Powered Career Roadmap
          </h1>
          <div className="grid gap-6">
            <input
              type="text"
              placeholder="Current Job (e.g., Teacher)"
              value={currentJob}
              onChange={(e) => setCurrentJob(e.target.value)}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Target Role (e.g., Frontend Developer)"
              value={targetJob}
              onChange={(e) => setTargetJob(e.target.value)}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Timeframe (e.g., 6 months)"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <motion.button
              onClick={handleGenerate}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition shadow-lg font-medium"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Generating...' : 'Generate Roadmap'}
            </motion.button>
          </div>

          {mermaidCode && (
            <>
              <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', opacity: 1, pointerEvents: 'none' }}>
                <MermaidRenderer chart={mermaidCode} />
              </div>
              <motion.button
                onClick={handlePDFDownload}
                className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-lg font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Download Career Roadmap PDF
              </motion.button>
            </>
          )}
        </motion.div>
      </div>
    </main>
  )
}
