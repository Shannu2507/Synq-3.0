'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Post = {
  id: string
  user_id: string
  username: string
  caption: string
  image_url?: string
  created_at: string
}

export default function ExplorePage() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching posts:', error.message)
      } else {
        setPosts(data)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-white mb-6">Explore</h1>
      {posts.map((post) => (
        <div key={post.id} className="bg-neutral-900 p-4 rounded-xl mb-4 shadow">
          <div className="text-white text-sm opacity-70 mb-1">
            @{post.username || 'Anonymous'} • {new Date(post.created_at).toLocaleString()}
          </div>
          <p className="text-white text-base">{post.caption}</p>
          {post.image_url && (
            <img
              src={post.image_url}
              alt="Post"
              className="w-full mt-2 rounded-lg object-cover max-h-96"
            />
          )}
        </div>
      ))}
    </div>
  )
}
