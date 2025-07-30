'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface ProfileSectionProps {
  user: any
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const [username, setUsername] = useState(user?.username || '')
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!user) return
    setLoading(true)
    await supabase
      .from('users')
      .update({ username })
      .eq('id', user.id)
    setEditing(false)
    setLoading(false)
  }

  return (
    <div className="space-y-2 mt-4">
      <img
        src={user?.avatar_url}
        alt="Profile"
        className="w-16 h-16 rounded-full"
      />
      {editing ? (
        <div className="space-x-2">
          <input
            className="bg-black border border-gray-600 rounded px-2 py-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-2 py-1 rounded"
            disabled={loading}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg">{user?.username || 'No Username'}</p>
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-blue-400 underline"
          >
            Edit Username
          </button>
        </div>
      )}
    </div>
  )
}
