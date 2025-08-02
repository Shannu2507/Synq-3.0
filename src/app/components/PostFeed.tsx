"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import PostCard from "./PostCard"

type Post = {
  id: string
  user_name: string | null
  caption: string
  image_url: string | null
  like_count: number
  created_at: string
  user_id: string
}

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setPosts(data)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          userId={post.user_id}
          username={post.user_name || "anon"}
          content={post.caption}
          imageUrl={post.image_url}
          likes={post.like_count || 0}
        />
      ))}
    </div>
  )
}
