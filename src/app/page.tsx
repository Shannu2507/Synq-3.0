'use client'

import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
import CreatePost from './components/CreatePost'
import PostFeed from './components/PostFeed'
import TopNav from './components/TopNav'
import Login from './components/Login'
import UserSync from './components/UserSync'

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [page, setPage] = useState<'home' | 'explore' | 'profile'>('home')

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
    }

    getSession()
  }, [])

  useEffect(() => {
    if (page === 'home') {
      fetchPosts()
    }
  }, [page])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setPosts(data)
    }
  }

  if (!session) {
    return <Login />
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex-1 flex flex-col relative">
        <TopNav />
        <UserSync session={session} />

        {page === 'home' && (
          <>
            <CreatePost session={session} onPostCreated={fetchPosts} />
            <PostFeed session={session} />
          </>
        )}
      </div>

      <footer className="flex justify-around border-t border-white/10 py-2">
        <button
          className={`text-sm ${page === 'home' ? 'text-cyan-400' : 'text-white/50'}`}
          onClick={() => setPage('home')}
        >
          Home
        </button>
        <button
          className={`text-sm ${page === 'explore' ? 'text-cyan-400' : 'text-white/50'}`}
          onClick={() => setPage('explore')}
        >
          Explore
        </button>
        <button
          className={`text-sm ${page === 'profile' ? 'text-cyan-400' : 'text-white/50'}`}
          onClick={() => setPage('profile')}
        >
          Profile
        </button>
      </footer>
    </div>
  )
}
