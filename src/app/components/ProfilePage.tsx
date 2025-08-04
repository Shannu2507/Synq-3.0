'use client'

import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import supabase from '@/lib/supabaseClient'
import PostCard from './PostCard'

interface Props {
  session: Session
}

export default function ProfilePage({ session }: Props) {
  const [posts, setPosts] = useState<any[]>([])
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      if (!session) return

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('username')
        .eq('id', session.user.id)
        .single()

      if (!userError && userData) {
        setUsername(userData.username)
      }

      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (!postsError && postsData) {
        setPosts(postsData)
      }
    }

    fetchUserAndPosts()
  }, [session])

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="mb-2 text-lg">Username: {username}</p>
      <h2 className="text-xl font-bold mb-4">Your Posts</h2>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} session={session} />
        ))}
      </div>
    </div>
  )
}
