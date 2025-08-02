'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ProfilePage({ session }: { session: any }) {
  const [username, setUsername] = useState('')
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return

      const { data, error } = await supabase
        .from('users')
        .select('username')
        .eq('id', session.user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error.message)
      } else {
        setUsername(data.username)
      }
    }

    fetchProfile()
  }, [session])

  const updateUsername = async () => {
    const { error } = await supabase
      .from('users')
      .update({ username })
      .eq('id', session.user.id)

    if (error) {
      console.error('Error updating username:', error.message)
    } else {
      setEditing(false)
    }
  }

  if (!session) {
    return (
      <div className="text-center mt-10 text-white">
        <p>Please sign in to view your profile</p>
        <button
          onClick={async () => {
            await supabase.auth.signInWithOAuth({ provider: 'google' })
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-neutral-900 p-6 rounded-xl text-white">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <p><strong>Email:</strong> {session.user.email}</p>

      <div className="mt-4">
        <strong>Username:</strong>{' '}
        {editing ? (
          <>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 rounded text-black"
            />
            <button
              onClick={updateUsername}
              className="ml-2 px-3 py-1 bg-green-600 rounded hover:bg-green-700"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span>{username}</span>
            <button
              onClick={() => setEditing(true)}
              className="ml-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  )
}
