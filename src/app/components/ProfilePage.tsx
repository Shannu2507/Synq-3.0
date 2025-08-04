'use client'

import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import supabase from '@/lib/supabaseClient'
import PostCard from './PostCard'

type Props = {
  session: Session
}

export default function ProfilePage({ session }: Props) {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setPosts(data)
      }
    }

    fetchPosts()
  }, [session.user.id])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Posts</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentUser={session.user} />
      ))}
    </div>
  )
}
