'use client'

import { Session } from '@supabase/supabase-js'

interface Props {
  post: any
  session: Session
}

export default function PostCard({ post, session }: Props) {
  const isAuthor = post.user_id === session.user.id

  return (
    <div className="bg-zinc-900 p-4 rounded-xl">
      <p className="text-sm text-gray-400">{post.username}</p>
      <p className="text-white mt-2">{post.content}</p>
      {isAuthor && (
        <button className="text-red-500 text-xs mt-2">Delete</button>
      )}
    </div>
  )
}
