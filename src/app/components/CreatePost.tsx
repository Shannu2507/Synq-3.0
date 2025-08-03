"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabaseClient"
import { Session } from "@supabase/supabase-js"

export default function CreatePost({ session }: { session: Session }) {
  const supabase = createClient()
  const [content, setContent] = useState("")
  const [username, setUsername] = useState("")

  const handlePost = async () => {
    if (!content.trim()) return

    const { error } = await supabase.from("posts").insert({
      content,
      username: username.trim() === "" ? "Anonymous" : username,
      user_id: session.user.id,
    })

    if (!error) {
      setContent("")
      setUsername("")
    }
  }

  return (
    <div className="w-full max-w-xl mb-6 bg-zinc-900 p-6 rounded-lg shadow-md border border-zinc-700">
      <input
        type="text"
        placeholder="Name"
        className="w-full mb-3 px-4 py-2 bg-zinc-800 text-white rounded-md placeholder-zinc-500 focus:outline-none focus:ring focus:ring-blue-500"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <textarea
        placeholder="What's on your mind?"
        className="w-full mb-4 px-4 py-2 h-24 bg-zinc-800 text-white rounded-md placeholder-zinc-500 focus:outline-none focus:ring focus:ring-blue-500 resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handlePost}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200 w-full"
      >
        Post
      </button>
    </div>
  )
}
