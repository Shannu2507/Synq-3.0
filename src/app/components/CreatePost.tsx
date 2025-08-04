'use client'

import { useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js'

type Props = {
  session: Session
}

export default function CreatePost({ session }: Props) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePost = async () => {
    if (!content.trim()) return

    setLoading(true)
    await supabase.from('posts').insert({
      content,
      user_id: session.user.id,
      username: session.user.user_metadata.name,
    })
    setContent('')
    setLoading(false)
  }

  return (
    <div className="p-4 border-b border-gray-700">
      <textarea
        className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={handlePost}
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
    </div>
  )
}
