'use client'

import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import PostCard from '../components/PostCard'

export default function ExplorePage() {
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
      <h2 className="text-xl font-bold mb-4">Explore</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentUser={null} />
      ))}
    </div>
  )
}
