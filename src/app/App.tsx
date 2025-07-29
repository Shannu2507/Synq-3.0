'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import Sidebar from './components/Sidebar'
import PostFeed from './components/PostFeed'
import CreatePost from './components/CreatePost'
import Login from './components/Login'

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Login />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="w-1/4 p-4">
        <Sidebar />
      </div>
      <div className="w-3/4 p-4 space-y-4">
        <CreatePost />
        <PostFeed />
      </div>
    </div>
  )
}
