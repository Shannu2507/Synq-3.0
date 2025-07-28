"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import PostCard from "./PostCard"

interface Post {
  id: string
  name?: string
  caption: string
  image_url?: string
}

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (data) setPosts(data)
  }

  useEffect(() => {
    fetchPosts()

    const channel = supabase
      .channel("realtime-posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          setPosts((prev) => [payload.new as Post, ...prev])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="space-y-4 px-2">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          name={post.name}
          caption={post.caption}
          image_url={post.image_url}
        />
      ))}
    </div>
  )
}
