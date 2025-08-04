'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import PostCard, { Post } from './PostCard'

export default function ProfilePage() {
  const [session, setSession] = useState<any>(null)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
    }

    getSession()
  }, [])

  useEffect(() => {
    if (session?.user.id) {
      fetchUserPosts()
    }
  }, [session])

  const fetchUserPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user posts:', error.message)
    } else {
      setPosts(data || [])
    }
  }

  if (!session) return null

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold mb-4">Your Posts</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
