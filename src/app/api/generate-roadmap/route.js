import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req) {
  const { currentJob, targetJob, timeframe } = await req.json()

  const prompt = `You're an expert career coach. Generate a 5-step career roadmap to go from "${currentJob}" to "${targetJob}" within "${timeframe}". 

Return ONLY the Mermaid.js flowchart code, and nothing else.

The chart should begin with:
\`\`\`mermaid
flowchart TD
A["Start"]

Each step should be a node, e.g., A --> B["Learn basics"], and end with G["Goal Reached"].
Only return the Mermaid.js code block – do not include any explanation or introductory text.
\`\`\`
`;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'llama3-70b-8192',
  })

  const aiReply = completion.choices[0]?.message?.content || ''
  const match = aiReply.match(/```mermaid\s*([\s\S]*?)```/i)
  const mermaidOnly = match ? match[1].trim() : ''

  return NextResponse.json({ mermaid: mermaidOnly })
}
