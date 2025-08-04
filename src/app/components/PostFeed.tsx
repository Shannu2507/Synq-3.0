'use client'

import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import supabase from '@/lib/supabaseClient'
import PostCard from './PostCard'

type Post = {
  id: string
  content: string
  created_at: string
  user_id: string
}

type Like = {
  id: string
  post_id: string
  user_id: string
}

type Comment = {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
}

export default function PostFeed({ session }: { session: Session }) {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching posts:', error)
    } else {
      setPosts(data as Post[])
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} session={session} />
      ))}
    </div>
  )
}
