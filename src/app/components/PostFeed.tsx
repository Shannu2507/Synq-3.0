"use client"

import React, { useEffect, useState } from "react"
import PostCard from "./PostCard"
import { supabase } from "@/lib/supabaseClient"

interface Post {
  id: number
  name: string
  caption: string
  image_url?: string
  likes: number
}

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [commentVisibility, setCommentVisibility] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase.from("posts").select("*").order("id", { ascending: false })
    if (error) console.error("Error fetching posts:", error)
    else setPosts(data as Post[])
  }

  const handleLike = async (postId: number) => {
    const post = posts.find((p) => p.id === postId)
    if (!post) return

    const updatedLikes = post.likes + 1
    const { error } = await supabase
      .from("posts")
      .update({ likes: updatedLikes })
      .eq("id", postId)

    if (error) {
      console.error("Error updating likes:", error)
    } else {
      setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: updatedLikes } : p)))
    }
  }

  const toggleComments = (postId: number) => {
    setCommentVisibility((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  return (
    <div className="p-4 space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          name={post.name}
          caption={post.caption}
          imageUrl={post.image_url}
          likes={post.likes}
          onLike={() => handleLike(post.id)}
          onCommentToggle={() => toggleComments(post.id)}
          showComments={commentVisibility[post.id]}
        />
      ))}
    </div>
  )
}
