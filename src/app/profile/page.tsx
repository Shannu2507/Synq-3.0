'use client'

import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import supabase from '../../lib/supabaseClient'
import ProfilePage from '../components/ProfilePage'

export default function ProfileRoute() {
  const [session, setSession] = useState<Session | null>(null)

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

  return <ProfilePage session={session} />
}
