"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabaseClient"

interface PostCardProps {
  id: number
  username: string
  content: string
  likes: number
  userId: string
  currentUserId: string
  onDelete: (id: number) => void
}

export default function PostCard({
  id,
  username,
  content,
  likes,
  userId,
  currentUserId,
  onDelete,
}: PostCardProps) {
  const supabase = createClient()
  const [likeCount, setLikeCount] = useState(likes)
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    const checkLikeStatus = async () => {
      const { data } = await supabase
        .from("likes")
        .select("*")
        .eq("post_id", id)
        .eq("user_id", currentUserId)

      if (data && data.length > 0) setHasLiked(true)
    }

    checkLikeStatus()
  }, [id, currentUserId, supabase])

  const handleLike = async () => {
    if (hasLiked) return

    const { error } = await supabase.from("likes").insert({
      post_id: id,
      user_id: currentUserId,
    })

    if (!error) {
      setHasLiked(true)
      setLikeCount((prev) => prev + 1)
    }
  }

  const handleDelete = async () => {
    const { error } = await supabase.from("posts").delete().eq("id", id)
    if (!error) onDelete(id)
  }

  return (
    <div className="w-full max-w-xl bg-zinc-900 text-white rounded-lg shadow-md p-4 mb-4 border border-zinc-700">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-zinc-400 font-medium">{username}</span>
        {userId === currentUserId && (
          <button
            onClick={handleDelete}
            className="text-red-500 text-sm hover:underline"
          >
            Delete
          </button>
        )}
      </div>
      <p className="text-lg mb-3">{content}</p>
      <div className="flex items-center text-zinc-400 text-sm">
        <button
          onClick={handleLike}
          className={`mr-2 hover:text-white ${hasLiked ? "text-white" : ""}`}
        >
          ❤️ {likeCount}
        </button>
        <span className="ml-auto">💬</span>
      </div>
    </div>
  )
}
