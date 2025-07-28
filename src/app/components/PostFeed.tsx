"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

interface Post {
  id: string
  caption?: string
  image_url?: string
  author?: string
  created_at: string
}

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching posts:", error)
      } else {
        setPosts(data || [])
      }
    }

    fetchPosts()

    // Optional: Realtime listener
    const channel = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          console.log("Realtime change:", payload)
          fetchPosts()
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  return (
    <div className="w-full max-w-xl mx-auto mt-6 space-y-4">
      {posts
        .filter((post) => post.caption || post.image_url)
        .map((post) => (
          <div
            key={post.id}
            className="bg-white shadow rounded-lg overflow-hidden border"
          >
            {post.image_url && (
              <img
                src={post.image_url}
                alt="Post"
                className="w-full object-cover"
              />
            )}
            <div className="p-4">
              <div className="text-sm font-semibold text-gray-700 mb-1">
                {post.author || "Anonymous"}
              </div>
              {post.caption && (
                <p className="text-sm text-gray-800">{post.caption}</p>
              )}
            </div>
          </div>
        ))}
    </div>
  )
}
