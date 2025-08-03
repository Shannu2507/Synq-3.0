"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabaseClient"
import PostCard from "./PostCard"
import { Session } from "@supabase/supabase-js"

interface Post {
  id: number
  user_id: string
  content: string
  created_at: string
}

interface Props {
  session: Session
}

export default function PostFeed({ session }: Props) {
  const supabase = createClient()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetchPosts()

    const channel = supabase
      .channel("realtime posts")
      .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, () => {
        fetchPosts()
      })
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

  return (
    <div className="mt-6 space-y-4 w-full max-w-xl">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} session={session} />
      ))}
    </div>
  )
}
