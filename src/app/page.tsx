'use client'

import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import supabase from '@/lib/supabaseClient'
import Sidebar from '@/components/Sidebar'
import TopNav from '@/components/TopNav'
import CreatePost from '@/components/CreatePost'
import PostFeed from '@/components/PostFeed'
import ExplorePage from '@/components/Explore'
import ProfilePage from '@/components/ProfilePage'
import UserSync from '@/components/UserSync'

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null)
  const [page, setPage] = useState('home')

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

  if (!session) {
    return (
      <main className="flex justify-center items-center min-h-screen bg-black text-white">
        <div>
          <h1 className="text-2xl mb-4">Welcome to Synq</h1>
          <a
            href="/login"
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
          >
            Sign in with Google
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar onNavigate={setPage} currentPage={page} />
      <div className="flex-1 flex flex-col relative">
        <TopNav />
        <UserSync session={session} />
        {page === 'home' && (
          <>
            <CreatePost session={session} />
            <PostFeed session={session} />
          </>
        )}
        {page === 'explore' && <ExplorePage />}
        {page === 'profile' && <ProfilePage session={session} />}
      </div>
    </main>
  )
}
