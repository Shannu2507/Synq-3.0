"use client"

import { useEffect, useState } from "react"
import CreatePost from "./components/CreatePost"
import PostFeed from "./components/PostFeed"
import Sidebar from "./components/Sidebar"
import { supabase } from "@/lib/supabaseClient"
import UserSync from "./components/UserSync"

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <>
      <UserSync />
      <div className="min-h-screen bg-black text-white flex">
        <div className="w-1/4 p-4">
          <Sidebar user={user} onLogout={handleLogout} />
        </div>
        <div className="w-3/4 p-4 space-y-4">
          <CreatePost user={user} />
          <PostFeed />
        </div>
      </div>
    </>
  )
}
