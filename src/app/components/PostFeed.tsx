// src/app/components/PostFeed.tsx
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type Props = {
  session: any
}

export default function PostFeed({ session }: Props) {
  const [posts, setPosts] = useState<any[]>([])
  const [showComments, setShowComments] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false })
    if (data) setPosts(data)
  }

  const handleLike = async (postId: string) => {
    await supabase.from("posts").update({ likes: supabase.raw("likes + 1") }).eq("id", postId)
    fetchPosts()
  }

  const handleDelete = async (postId: string) => {
    await supabase.from("posts").delete().eq("id", postId)
    fetchPosts()
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-[#1a1a1a] p-4 rounded-2xl shadow">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">{post.name}</h2>
            {post.user_id === session.user.id && (
              <button
                onClick={() => handleDelete(post.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            )}
          </div>
          <p className="mt-2">{post.caption}</p>
          {post.image_url && (
            <img src={post.image_url} alt="post" className="mt-2 rounded max-h-80 w-full object-cover" />
          )}
          <div className="mt-3 flex space-x-4 text-sm text-gray-400">
            <button onClick={() => handleLike(post.id)}>❤️ {post.likes || 0}</button>
            <button onClick={() => setShowComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}>
              💬 Comment
            </button>
          </div>
          {showComments[post.id] && (
            <div className="mt-2 text-sm text-gray-500">Comments coming soon...</div>
          )}
        </div>
      ))}
    </div>
  )
}
