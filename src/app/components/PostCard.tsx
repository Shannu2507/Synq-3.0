"use client"

import { useState } from "react"
import { MessageCircle, Heart } from "lucide-react"
import Image from "next/image"
import { supabase } from "../../lib/supabaseClient"

interface Post {
  id: number
  name: string
  caption: string
  image_url?: string
  likes: number
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const [likes, setLikes] = useState(post.likes || 0)
  const [showComments, setShowComments] = useState(false)

  const handleLike = async () => {
    const { data, error } = await supabase
      .from("posts")
      .update({ likes: likes + 1 })
      .eq("id", post.id)

    if (!error) {
      setLikes(likes + 1)
    }
  }

  return (
    <div className="bg-zinc-900 p-4 rounded-2xl shadow-lg">
      <div className="text-lg font-semibold text-white">{post.name}</div>
      <div className="text-sm text-gray-300 mt-1">{post.caption}</div>
      {post.image_url && (
        <div className="mt-4">
          <Image
            src={post.image_url}
            alt="Post Image"
            width={500}
            height={300}
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>
      )}
      <div className="flex items-center space-x-4 mt-4">
        <button onClick={handleLike} className="flex items-center space-x-1">
          <Heart className="w-5 h-5 text-red-500" />
          <span className="text-white">{likes}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1"
        >
          <MessageCircle className="w-5 h-5 text-blue-400" />
        </button>
      </div>
      {showComments && (
        <div className="mt-4 text-gray-400 italic text-sm">
          Comments section coming soon...
        </div>
      )}
    </div>
  )
}
