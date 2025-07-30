'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Heart, MessageCircle } from 'lucide-react'

export default function PostCard({ post }: { post: any }) {
  const [likes, setLikes] = useState(0)
  const [showComments, setShowComments] = useState(false)

  return (
    <div className="p-4 border my-2 rounded bg-white text-black">
      <h3 className="font-bold">{post.name}</h3>
      <p>{post.caption}</p>
      {post.image && <img src={post.image} alt="Post" className="mt-2 rounded" />}
      <div className="flex gap-4 mt-3 items-center">
        <Heart className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => setLikes(likes + 1)} />
        <span>{likes}</span>
        <MessageCircle
          className="w-5 h-5 text-blue-500 cursor-pointer"
          onClick={() => setShowComments(!showComments)}
        />
      </div>
      {showComments && <div className="text-sm mt-2 italic">[Comments go here]</div>}
    </div>
  )
}
