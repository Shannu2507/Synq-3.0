'use client'

import React, { useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import Image from 'next/image'

interface SidebarProps {
  user: any
  onLogout: () => Promise<void>
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  const supabase = createClient()
  const [username, setUsername] = useState(user?.username || '')

  const handleUsernameUpdate = async () => {
    if (!user?.id) return
    const { error } = await supabase
      .from('users')
      .update({ username })
      .eq('id', user.id)

    if (error) {
      console.error('Failed to update username:', error.message)
    } else {
      alert('Username updated!')
    }
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Sidebar</h2>

      {!user ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSignIn}
        >
          Sign in with Google
        </button>
      ) : (
        <div className="space-y-4">
          {user?.avatar_url && (
            <Image
              src={user.avatar_url}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
          )}
          <p className="text-sm text-gray-400">Logged in as:</p>
          <p className="font-semibold">{user.email}</p>

          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-800 text-white rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Edit username"
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleUsernameUpdate}
          >
            Save Username
          </button>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
