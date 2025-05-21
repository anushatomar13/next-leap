
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { currentRole, targetRole } = await req.json()

  if (!currentRole || !targetRole) {
    return NextResponse.json({ error: 'Missing input' }, { status: 400 })
  }

  try {
    const prompt = `
You are an expert career coach. Generate a concise, actionable career roadmap for someone moving from "${currentRole}" to "${targetRole}". 
Break it down into 4–6 realistic, sequential steps.

Then, convert the roadmap into Mermaid.js flowchart format like this:

\`\`\`mermaid
flowchart TD
    A["Start: ${currentRole}"]
    A --> B["Step 1"]
    B --> C["Step 2"]
    C --> D["Step 3"]
    D --> E["Goal: ${targetRole}"]
\`\`\`
Return only the mermaid code.
    `.trim()

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    })

    const json = await response.json()
    const content = json.choices?.[0]?.message?.content || ''

    return NextResponse.json({ mermaidCode: content.trim() })
  } catch (err) {
    console.error('Groq API Error:', err)
    return NextResponse.json({ error: 'Failed to generate roadmap' }, { status: 500 })
  }
}
