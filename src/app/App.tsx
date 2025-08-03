"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabaseClient"
import { Session } from "@supabase/supabase-js"
import Sidebar from "./components/Sidebar"
import PostFeed from "./components/PostFeed"
import CreatePost from "./components/CreatePost"
import ProfilePage from "./components/ProfilePage"
import Explore from "./components/Explore"
import UserSync from "./components/UserSync"
import AuthButton from "./components/AuthButton"

export default function App() {
  const supabase = createClient()
  const [session, setSession] = useState<Session | null>(null)
  const [page, setPage] = useState<"home" | "profile" | "explore">("home")

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }
    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <Sidebar page={page} setPage={setPage} session={session} />
      <div className="flex-1 flex flex-col items-center py-6 px-4 overflow-y-auto">
        {!session ? (
          <div className="flex flex-col items-center justify-center mt-32">
            <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Synq</h1>
            <p className="text-zinc-400 mb-4 text-center max-w-md">
              Synq helps you track your momentum, share raw thoughts, and build discipline—one day at a time.
            </p>
            <AuthButton />
          </div>
        ) : (
          <>
            <UserSync session={session} />
            {page === "home" && (
              <>
                <CreatePost session={session} />
                <PostFeed />
              </>
            )}
            {page === "profile" && <ProfilePage session={session} />}
            {page === "explore" && <Explore />}
          </>
        )}
      </div>
    </div>
  )
}
