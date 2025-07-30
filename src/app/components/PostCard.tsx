'use client'

import { useState } from 'react'
import { MessageCircle, ThumbsUp } from 'lucide-react'
import { Post } from '../types'
import { supabase } from '../lib/supabaseClient'
import { User } from '@supabase/supabase-js'

interface PostCardProps {
  post: Post
  user: User | null
}

export default function PostCard({ post, user }: PostCardProps) {
  const [likes, setLikes] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)

  const handleLike = async () => {
    const { data, error } = await supabase
      .from('posts')
      .update({ likes: likes + 1 })
      .eq('id', post.id)

    if (!error) {
      setLikes(likes + 1)
    }
  }

  const toggleComments = () => {
    setShowComments((prev) => !prev)
  }

  return (
    <div className="border border-gray-700 p-4 rounded-lg shadow-md bg-gray-900">
      <div className="text-sm text-gray-400">{post.name || 'Anonymous'}</div>
      <div className="text-lg font-medium mb-2">{post.caption}</div>
      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          className="w-full h-auto rounded-md mb-2"
        />
      )}
      <div className="flex items-center space-x-4">
        <button onClick={handleLike} className="flex items-center space-x-1">
          <ThumbsUp size={18} />
          <span>{likes}</span>
        </button>
        <button onClick={toggleComments} className="flex items-center space-x-1">
          <MessageCircle size={18} />
          <span>Comments</span>
        </button>
      </div>
      {showComments && (
        <div className="mt-2 text-sm text-gray-300">
          {/* Add comment rendering logic here */}
          No comments yet.
        </div>
      )}
    </div>
  )
}
