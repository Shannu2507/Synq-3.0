"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import PostCard from "./PostCard"

export default function PostFeed() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })
      if (!error && data) setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
