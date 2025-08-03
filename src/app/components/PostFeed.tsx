"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabaseClient"
import { Session } from "@supabase/supabase-js"
import PostCard from "./PostCard"

type Post = {
  id: string
  content: string
  username: string
  created_at: string
  likes: number
}

export default function PostFeed({ session }: { session: Session | null }) {
  const supabase = createClient()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetchPosts()

    const channel = supabase
      .channel("realtime posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        () => {
          fetchPosts()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setPosts(data as Post[])
    }
  }

  const handleDelete = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId))
  }

  return (
    <div className="w-full mt-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          session={session}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}
