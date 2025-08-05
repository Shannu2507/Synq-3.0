'use client'

import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import supabase from '../../lib/supabaseClient'

type Post = {
  id: number
  content: string
  created_at: string
  user_id: string
  username: string
}

type Props = {
  session: Session | null
}

export default function PostFeed({ session }: Props) {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <div className="space-y-4 p-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4 bg-zinc-900 border border-zinc-700 rounded"
        >
          <p className="text-sm text-gray-400 mb-2">{post.username}</p>
          <p className="text-white">{post.content}</p>
        </div>
      ))}
    </div>
  )
}
