'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import PostCard from './PostCard'
import { Post } from '../types'
import { User } from '@supabase/supabase-js'

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetchPosts()
    fetchUser()
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: false })

    if (!error && data) {
      setPosts(data)
    }
  }

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} user={user} />
      ))}
    </div>
  )
}
