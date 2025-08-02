// src/app/explore/page.tsx
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ExplorePage() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetchExplorePosts()
  }, [])

  const fetchExplorePosts = async () => {
    const { data } = await supabase.from("posts").select("*").order("likes", { ascending: false })
    if (data) setPosts(data)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      {posts.map((post) => (
        <div key={post.id} className="bg-[#1a1a1a] p-4 rounded-2xl shadow">
          <div className="font-bold">{post.name}</div>
          <p className="mt-2">{post.caption}</p>
          {post.image_url && (
            <img src={post.image_url} alt="post" className="mt-2 rounded max-h-80 w-full object-cover" />
          )}
          <div className="text-sm text-gray-400 mt-2">❤️ {post.likes || 0}</div>
        </div>
      ))}
    </div>
  )
}
