"use client"

import { useState } from "react"
import supabase from "@/lib/supabaseClient" // ✅ fixed import

export default function NewPostForm() {
  const [content, setContent] = useState("")

  const handlePost = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("posts").insert({
      content,
      user_id: user.id,
      username: user.user_metadata.full_name || user.email,
    })

    setContent("")
    window.location.reload()
  }

  return (
    <div className="p-4 border-t border-gray-700">
      <textarea
        className="w-full bg-gray-900 text-white border border-gray-600 rounded p-2 resize-none"
        rows={3}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handlePost}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Post
      </button>
    </div>
  )
}
