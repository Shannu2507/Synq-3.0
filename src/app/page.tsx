'use client'

import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import supabase from '../lib/supabaseClient' // ✅ FIXED: default import

import CreatePost from './components/CreatePost'
import PostFeed from './components/PostFeed'
import TopNav from './components/TopNav'
import UserSync from './components/UserSync'

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null)
  const [page, setPage] = useState<'home' | 'explore' | 'profile'>('home')

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) console.error('Error getting session:', error)
      setSession(data.session)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col relative">
        <TopNav />
        <UserSync session={session} />
        {page === 'home' && (
          <>
            <CreatePost session={session} />
            <PostFeed session={session} />
          </>
        )}
        {page === 'explore' && <p className="text-center text-gray-400 mt-10">Explore Coming Soon</p>}
        {page === 'profile' && <p className="text-center text-gray-400 mt-10">Profile Coming Soon</p>}
      </div>
    </div>
  )
}
