'use client'

import { useEffect, useState } from 'react'
import supabase from '../../../lib/supabaseClient'
import { Session } from '@supabase/supabase-js'

type Post = {
  id: string
  content: string
  created_at: string
  username: string
  like_count: number
}

interface PostFeedProps {
  session: Session
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function PostFeed({ session }: PostFeedProps) {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) console.error(error)
      else setPosts(data as Post[])
    }

    fetchPosts()
  }, [])

  return (
    <div className="p-4 space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-zinc-900 rounded-xl p-4 shadow text-white"
        >
          <div className="text-sm text-gray-400 flex justify-between">
            <span>{post.username || 'Anonymous'}</span>
            <span>{formatTimeAgo(post.created_at)}</span>
          </div>
          <p className="text-lg mt-2">{post.content}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500 gap-4">
            <span>🤍 {post.like_count || 0}</span>
            <span>💬 Comment</span>
          </div>
        </div>
      ))}
    </div>
  )
}
