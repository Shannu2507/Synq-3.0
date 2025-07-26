"use client"

import { useEffect, useState } from "react"
import { fetchPosts } from "@/lib/fetchPosts"

type Post = {
  id: string
  content: string
  author: string
  created_at: string
}

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      const data = await fetchPosts()
      setPosts(data)
      setLoading(false)
    }

    loadPosts()
  }, [])

  if (loading) return <p className="text-gray-500">Loading posts...</p>

  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="p-4 border rounded shadow">
            <p className="text-lg font-semibold">{post.author}</p>
            <p className="text-gray-800">{post.content}</p>
            <p className="text-sm text-gray-400">{new Date(post.created_at).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  )
}
