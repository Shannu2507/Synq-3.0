'use client'

import { useState, useEffect } from 'react'
import createClient from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import Sidebar from './components/Sidebar'
import CreatePost from './components/CreatePost'
import PostFeed from './components/PostFeed'
import ProfilePage from './components/ProfilePage'
import ExplorePage from './components/Explore'
import UserSync from './components/UserSync'
import TopNav from './components/TopNav'
import Login from './components/Login'

export default function App() {
  const supabase = createClient()

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

  if (!session) return <Login />

  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar onNavigate={setPage} currentPage={page} />
      <div className="flex-1 flex flex-col relative">
        <TopNav />
        <UserSync session={session} />
        {page === 'home' && <><CreatePost session={session} /><PostFeed session={session} /></>}
        {page === 'explore' && <ExplorePage />}
        {page === 'profile' && <ProfilePage session={session} />}
      </div>
    </main>
  )
}
