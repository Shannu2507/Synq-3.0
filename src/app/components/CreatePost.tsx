"use client"

import { useState } from "react"
import { Session } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabaseClient"

type Props = {
  session: Session
}

export default function CreatePost({ session }: Props) {
  const supabase = createClient()
  const [content, setContent] = useState("")

  const handlePost = async () => {
    if (!content.trim()) return

    await supabase.from("posts").insert({
      content,
      user_id: session.user.id,
    })

    setContent("")
  }

  return (
    <div className="w-full max-w-xl mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-3 rounded-md bg-zinc-800 text-white resize-none"
        rows={3}
      />
      <button
        onClick={handlePost}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
      >
        Post
      </button>
    </div>
  )
}
