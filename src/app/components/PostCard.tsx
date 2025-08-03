"use client"

import { Session } from "@supabase/supabase-js"
import { useState } from "react"

type Post = {
  id: number
  content: string
  created_at: string
  user_id: string
}

type PostCardProps = {
  post: Post
  session: Session
}

export default function PostCard({ post, session }: PostCardProps) {
  const [liked, setLiked] = useState(false)

  return (
    <div className="bg-zinc-900 p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 bg-zinc-700 rounded-full mr-2" />
        <span className="font-semibold text-white">{post.user_id}</span>
      </div>
      <p className="text-zinc-300">{post.content}</p>
      <div className="text-sm text-zinc-500 mt-2">
        {new Date(post.created_at).toLocaleString()}
      </div>
    </div>
  )
}
