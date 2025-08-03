"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabaseClient"
import { Session } from "@supabase/supabase-js"

type Props = {
  session: Session
}

type Post = {
  id: string
  user_id: string
  content: string
  created_at: string
  likes: number
}

export default function PostFeed({ session }: Props) {
  const supabase = createClient()
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) console.error("Error fetching posts:", error)
    else setPosts(data)
  }

  const handleLike = async (postId: string) => {
    const { error } = await supabase
      .from("posts")
      .update({ likes: (posts.find(p => p.id === postId)?.likes || 0) + 1 })
      .eq("id", postId)
    if (error) console.error("Error liking post:", error)
    else fetchPosts()
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="w-full max-w-xl space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-zinc-900 p-4 rounded-lg shadow">
          <p className="text-white">{post.content}</p>
          <div className="text-sm text-zinc-400 mt-2 flex justify-between items-center">
            <span>{new Date(post.created_at).toLocaleString()}</span>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => handleLike(post.id)}
            >
              ❤️ {post.likes}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
