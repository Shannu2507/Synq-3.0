"use client"

import { useEffect, useState } from "react"
import PostCard from "./PostCard"
import { supabase } from "../../lib/supabaseClient"

interface Post {
  id: number
  name: string
  caption: string
  image_url?: string
  likes: number
}

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("id", { ascending: false })

      if (!error && data) {
        setPosts(data)
      }
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
