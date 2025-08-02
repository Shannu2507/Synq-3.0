"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function PostCard({ post }: { post: any }) {
  const [likes, setLikes] = useState(post.likes || 0)
  const [showComments, setShowComments] = useState(false)

  const handleLike = async () => {
    const newLikes = likes + 1
    setLikes(newLikes)
    await supabase.from("posts").update({ likes: newLikes }).eq("id", post.id)
  }

  return (
    <div className="bg-zinc-900 p-4 rounded-xl shadow space-y-2">
      <div className="font-semibold text-white">{post.name}</div>
      <p className="text-zinc-300">{post.caption}</p>
      {post.image_url && <img src={post.image_url} alt="Post" className="rounded w-full mt-2" />}
      <div className="flex gap-4 text-zinc-400 mt-2">
        <button onClick={handleLike}>❤️ {likes}</button>
        <button onClick={() => setShowComments(!showComments)}>💬 Comments</button>
      </div>
      {showComments && (
        <div className="mt-2 text-sm text-zinc-400 italic">Comments feature coming soon...</div>
      )}
    </div>
  )
}
