"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import CreatePost from "./components/CreatePost"
import PostFeed from "./components/PostFeed"
import UserSync from "./components/UserSync"

export default function App() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6">
      <UserSync />
      {!session ? (
        <button
          onClick={signInWithGoogle}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-white">Logged in as {session.user.email}</p>
            <button onClick={signOut} className="text-red-500 hover:underline">
              Logout
            </button>
          </div>
          <CreatePost user={session.user} />
          <PostFeed />
        </>
      )}
    </main>
  )
}
