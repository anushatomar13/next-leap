'use client'
import { useEffect } from 'react'
import mermaid from 'mermaid'

export default function MermaidRenderer({ chart }) {
  useEffect(() => {
  mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  themeVariables: {
    background: '#000000',            
    primaryColor: '#0a4d8c',          
    primaryBorderColor: '#1e90ff',     
    primaryTextColor: '#ffffff',       
    fontFamily: 'monospace',
    fontSize: '16px',
    lineColor: '#1e90ff',         
    clusterBkg: '#000000',
    clusterBorder: '#1e90ff',
  }

})

    mermaid.contentLoaded()
  }, [chart])

  return (
    <div className="mermaid rounded-lg p-4">
      {chart}
    </div>
  )
}
