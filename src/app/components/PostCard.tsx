"use client"

import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"

interface Post {
  id: number
  content: string
  created_at: string
  username: string
  user_id: string
}

interface Props {
  post: Post
}

export default function PostCard({ post }: Props) {
  const [likes, setLikes] = useState<number>(0)

  useEffect(() => {
    const fetchLikes = async () => {
      const { data, error } = await supabase
        .from("likes")
        .select("*", { count: "exact", head: true })
        .eq("post_id", post.id)

      if (!error && data) {
        setLikes(data.length || 0)
      }
    }

    fetchLikes()
  }, [post.id])

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg border border-gray-700 my-2">
      <p className="text-sm text-gray-400">{post.username}</p>
      <p className="mt-2">{post.content}</p>
      <p className="text-xs text-gray-500 mt-2">{likes} likes</p>
    </div>
  )
}
