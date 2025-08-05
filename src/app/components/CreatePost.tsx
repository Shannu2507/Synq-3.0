'use client'

import { useState } from 'react'
import { Session } from '@supabase/supabase-js'
import supabase from '../../../lib/supabaseClient'

type Props = {
  session: Session
  onPostCreated: () => void
}

export default function CreatePost({ session, onPostCreated }: Props) {
  const [content, setContent] = useState('')

  const handlePost = async () => {
    if (!content.trim()) return

    const { error } = await supabase.from('posts').insert([
      {
        content,
        user_id: session.user.id,
      },
    ])

    if (!error) {
      setContent('')
      onPostCreated()
    } else {
      console.error('Post error:', error)
    }
  }

  return (
    <div className="p-4">
      <textarea
        className="w-full p-3 rounded-lg bg-zinc-800 text-white"
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button
        onClick={handlePost}
        className="mt-2 px-4 py-2 bg-cyan-400 text-black rounded hover:bg-cyan-300 transition"
      >
        Post
      </button>
    </div>
  )
}
