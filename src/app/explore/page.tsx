'use client'

import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import supabase from '@/lib/supabaseClient'
import PostCard from '../components/PostCard'

interface Props {
  session: Session | null
}

export default function ExplorePage({ session }: Props) {
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
    <div className="p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Explore</h2>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} session={session} />
        ))}
      </div>
    </div>
  )
}
