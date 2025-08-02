'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function CreatePost({ session }: { session: any }) {
  const [caption, setCaption] = useState('')

  const handlePost = async () => {
    if (!caption.trim()) return

    const { data, error } = await supabase.from('posts').insert([
      {
        caption,
        user_id: session.user.id,
      },
    ])

    if (error) {
      console.error('Error posting:', error.message)
    } else {
      setCaption('')
    }
  }

  if (!session) {
    return (
      <div className="text-center mt-4">
        <p className="text-white mb-2">Please sign in to post</p>
        <button
          onClick={async () => {
            await supabase.auth.signInWithOAuth({ provider: 'google' })
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center w-full px-4 mt-6">
      <textarea
        className="w-full p-3 rounded text-black"
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button
        onClick={handlePost}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Post
      </button>
    </div>
  )
}
