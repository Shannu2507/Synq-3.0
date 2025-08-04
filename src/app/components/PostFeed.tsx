'use client'

import { useEffect, useState } from 'react'
import { Database } from '@/types/supabase'
import { Session } from '@supabase/supabase-js'
import supabase from '@/lib/supabaseClient'
import PostCard from './PostCard'

type Post = Database['public']['Tables']['posts']['Row']
type Like = Database['public']['Tables']['likes']['Row']
type Comment = Database['public']['Tables']['comments']['Row']

interface Props {
  session: Session
}

export default function PostFeed({ session }: Props) {
  const [posts, setPosts] = useState<PostWithExtras[]>([])

  type PostWithExtras = Post & {
    likes: Like[]
    comments: Comment[]
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*, likes(*), comments(*)')
        .order('created_at', { ascending: false })

      if (error) console.error('Error loading posts:', error)
      else setPosts(data as PostWithExtras[])
    }

    fetchPosts()
  }, [])

  return (
    <div className="p-4 space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} session={session} />
      ))}
    </div>
  )
}
