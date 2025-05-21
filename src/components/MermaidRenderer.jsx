'use client'
import { useEffect } from 'react'
import mermaid from 'mermaid'

export default function MermaidRenderer({ chart }) {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true })
    mermaid.contentLoaded()
  }, [chart])

  return (
    <div className="mermaid bg-white rounded-lg p-4 shadow">
      {chart}
    </div>
  )
}
