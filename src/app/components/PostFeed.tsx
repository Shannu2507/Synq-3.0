'use client'

import { useEffect, useState } from 'react'
import supabase from '../../lib/supabaseClient'
import PostCard from './PostCard'

interface Post {
  id: number
  content: string
  created_at: string
  username: string
  user_id: string
}

export default function PostFeed({ session }: { session: any }) {
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setPosts(data)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} session={session} />
      ))}
    </div>
  )
}
