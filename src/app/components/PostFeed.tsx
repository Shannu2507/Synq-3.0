"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabaseClient"
import PostCard from "./PostCard"

interface Post {
  id: number
  content: string
  likes: number
  user_id: string
  profiles: {
    username: string
  }
}

export default function PostFeed() {
  const supabase = createClient()
  const [posts, setPosts] = useState<Post[]>([])
  const [currentUserId, setCurrentUserId] = useState<string>("")

  useEffect(() => {
    const fetchPosts = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) setCurrentUserId(session.user.id)

      const { data, error } = await supabase
        .from("posts")
        .select("*, profiles(username)")
        .order("created_at", { ascending: false })

      if (!error && data) setPosts(data as Post[])
    }

    fetchPosts()
  }, [])

  const handleDelete = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
  }

  return (
    <div className="w-full max-w-xl mt-6">
      {posts.length === 0 ? (
        <p className="text-zinc-400 text-center mt-12">No posts yet. Be the first to share something.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            username={post.profiles?.username || "Unknown"}
            content={post.content}
            likes={post.likes}
            userId={post.user_id}
            currentUserId={currentUserId}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  )
}
