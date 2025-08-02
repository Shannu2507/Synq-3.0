'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import CreatePost from './components/CreatePost'
import PostFeed from './components/PostFeed'
import ProfilePage from './components/ProfilePage'
import UserSync from './components/UserSync'
import Sidebar from './components/Sidebar'
import Login from './login/page'
import ExplorePage from './explore/page' 

export default function App() {
  const [session, setSession] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const currentSession = supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <CreatePost />
            <PostFeed />
          </>
        )
      case 'profile':
        return <ProfilePage />
      case 'explore':
        return <ExplorePage />
      default:
        return null
    }
  }

  return (
    <main className="flex h-screen w-full bg-black text-white">
      {session ? (
        <>
          <UserSync session={session} />
          <Sidebar setCurrentPage={setCurrentPage} />
          <section className="flex-1 overflow-y-auto p-4">{renderPage()}</section>
        </>
      ) : (
        <Login />
      )}
    </main>
  )
}
