'use client'

import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'
import Sidebar from './components/Sidebar'
import PostFeed from './components/PostFeed'
import CreatePost from './components/CreatePost'
import { useRouter } from 'next/navigation'

export default function App() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (!data?.user) {
        router.push('/login')
      } else {
        setUser(data.user)
      }
    }

    getUser()
  }, [])

  if (!user) return null // or loading indicator

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
