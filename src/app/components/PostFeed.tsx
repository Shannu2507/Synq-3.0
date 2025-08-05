'use client'

import { useEffect, useState } from 'react'
import supabase from '../../lib/supabaseClient'
import { formatDistanceToNow } from 'date-fns'
import LikeButton from './LikeButton'

export default function PostFeed() {
  const [posts, setPosts] = useState<any[]>([])
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUserId(session?.user?.id ?? null)
    }

    const fetchPosts = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) return

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (!error) setPosts(data || [])
    }

    getUser()
    fetchPosts()
  }, [])

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-zinc-900 p-4 rounded-xl shadow-md border border-zinc-700"
        >
          <div className="text-sm text-zinc-400">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </div>
          <p className="text-lg mt-2">{post.content}</p>
          <LikeButton postId={post.id} userId={userId} />
        </div>
      ))}
    </div>
  )
}
