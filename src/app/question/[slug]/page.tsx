'use client'

import { createQuestion } from "@/actions"
import { useState } from "react"

export default function Page({ params }: { params: { slug: string } }) {
  const [content, setContent ] = useState('')

  const handleClick = async function() {
      await createQuestion(params.slug, content)
  }

  return (
    <div>
      <form action={handleClick}>
        <input
          type="text"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id='title'
        />
        <button type="submit">Add question</button>
      </form>
    </div>
  )
}