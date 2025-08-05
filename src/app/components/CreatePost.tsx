'use client'

import { useState } from 'react'
import { Session } from '@supabase/supabase-js'
import supabase from '../../lib/supabaseClient'

type Props = {
  session: Session | null
  onPostCreated?: () => void
}

export default function CreatePost({ session, onPostCreated }: Props) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim() || !session) return
    setLoading(true)

    const { error } = await supabase.from('posts').insert([
      {
        content,
        user_id: session.user.id,
        username: session.user.user_metadata.name || 'Anonymous',
      },
    ])

    setLoading(false)
    setContent('')
    if (!error && onPostCreated) onPostCreated()
  }

  return (
    <div className="p-4 border-b border-zinc-800">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white"
        rows={3}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-600 disabled:opacity-50"
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
    </div>
  )
}
