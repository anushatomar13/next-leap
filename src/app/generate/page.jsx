'use client'
import { useState } from 'react'
import MermaidRenderer from '@/components/MermaidRenderer'
import { getUserData,saveRoadmap } from '@/lib/supabase/client'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'


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

  const canvas = await html2canvas(chartElement, {
    backgroundColor: '#ffffff',
    scale: 2,
  })

  const imgData = canvas.toDataURL('image/png')

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  })

  
  const imgWidth = canvas.width
  const imgHeight = canvas.height
pdf.setFont('times', 'italic')           
pdf.setFontSize(12)
pdf.setTextColor(100, 100, 100)         

// Align right at bottom-right corner
const pageWidth = pdf.internal.pageSize.getWidth()
const pageHeight = pdf.internal.pageSize.getHeight()

pdf.text('By NextLeap', pageWidth - 80, pageHeight - 30)
  // Scale to fit A4
  const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight)
  const x = (pageWidth - imgWidth * scale) / 2
  const y = 40 // leave top margin

  pdf.addImage(imgData, 'PNG', x, y, imgWidth * scale, imgHeight * scale)
  pdf.save('career-roadmap.pdf')
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
    <button
      onClick={handlePDFDownload}
      className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Your flowchart is ready – Click here to download as PDF
    </button>
  </div>
)}

    </main>
  )
}
