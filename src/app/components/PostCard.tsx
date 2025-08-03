"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabaseClient"
import { Session } from "@supabase/supabase-js"

type Post = {
  id: string
  content: string
  username: string
  created_at: string
  likes: number
}

type Props = {
  post: Post
  session: Session | null
  onDelete?: (postId: string) => void
}

export default function PostCard({ post, session, onDelete }: Props) {
  const supabase = createClient()
  const [likes, setLikes] = useState(post.likes || 0)
  const [liked, setLiked] = useState(false)

  const handleLike = async () => {
    if (liked) return
    const { error } = await supabase
      .from("posts")
      .update({ likes: likes + 1 })
      .eq("id", post.id)

    if (!error) {
      setLikes(likes + 1)
      setLiked(true)
    }
  }

  const handleDelete = async () => {
    if (session?.user && session.user.email === post.username) {
      const { error } = await supabase.from("posts").delete().eq("id", post.id)
      if (!error && onDelete) {
        onDelete(post.id)
      }
    }
  }

  return (
    <div className="w-full max-w-xl p-4 mb-4 bg-zinc-900 rounded-lg border border-zinc-800 shadow-sm transition hover:shadow-md">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-zinc-400">
          {post.username || "Anonymous"}
        </span>
        {session?.user && session.user.email === post.username && (
          <button
            onClick={handleDelete}
            className="text-xs text-red-500 hover:underline"
          >
            Delete
          </button>
        )}
      </div>
      <p className="text-zinc-100 whitespace-pre-wrap">{post.content}</p>
      <div className="flex items-center gap-4 mt-3 text-zinc-400 text-sm">
        <button
          onClick={handleLike}
          className={`hover:text-white transition flex items-center gap-1 ${liked ? "text-white" : ""}`}
        >
          🤍 {likes}
        </button>
        <button className="hover:text-white transition">💬</button>
      </div>
    </div>
  )
}
