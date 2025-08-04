'use client'

import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import PostCard from './PostCard'

type Props = {
  session: Session
}

export default function PostFeed({ session }: Props) {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setPosts(data)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="p-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentUser={session.user} />
      ))}
    </div>
  )
}
