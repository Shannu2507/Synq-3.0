'use client'

import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

type Post = {
  id: string
  content: string
  created_at: string
  user_id: string
}

type Props = {
  post: Post
  session: Session
}

export default function PostCard({ post, session }: Props) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    // You can check here if the current user liked the post
    // Example: compare session.user.id with likes if available
  }, [])

  return (
    <div className="bg-zinc-900 p-4 rounded-xl shadow-md">
      <div className="text-sm text-gray-400">
        Posted by: {post.user_id} | {new Date(post.created_at).toLocaleString()}
      </div>
      <div className="text-white mt-2">{post.content}</div>
    </div>
  )
}
