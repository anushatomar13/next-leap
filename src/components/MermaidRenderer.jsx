'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad: false })

export default function MermaidRenderer({ chart }) {
  const ref = useRef(null)

  useEffect(() => {
    if (chart && ref.current) {
      mermaid.render('theGraph', chart, (svgCode) => {
        ref.current.innerHTML = svgCode
      })
    }
  }, [chart])

  return (
    <div
      ref={ref}
      className="mt-6 p-4 bg-white border rounded shadow overflow-x-auto"
    />
  )
}
