// src/app/App.tsx
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import CreatePost from "./components/CreatePost"
import PostFeed from "./components/PostFeed"
import Sidebar from "./components/Sidebar"
import ProfilePage from "./components/ProfilePage"
import UserSync from "./components/UserSync"
import ExplorePage from "./explore/page"
import LoginPage from "./login/page"

export default function App() {
  const [session, setSession] = useState<any>(null)
  const [route, setRoute] = useState<"home" | "profile" | "explore">("home")

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }
    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <button
          onClick={handleSignIn}
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-200 transition"
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#0d0d0d] text-white">
      <Sidebar setRoute={setRoute} handleLogout={handleLogout} />
      <main className="flex-1 p-4">
        <UserSync session={session} />
        {route === "home" && (
          <>
            <CreatePost user={session.user} />
            <PostFeed session={session} />
          </>
        )}
        {route === "profile" && <ProfilePage session={session} />}
        {route === "explore" && <ExplorePage />}
      </main>
    </div>
  )
}
