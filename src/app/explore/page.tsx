'use client'

import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import supabase from '@/lib/supabaseClient'
import PostCard from '../components/PostCard'

export default function ExplorePage() {
  const [posts, setPosts] = useState<any[]>([])
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
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
