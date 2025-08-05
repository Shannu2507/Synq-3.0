'use client'

import { useState } from 'react'
import supabase from '../../lib/supabaseClient'

export default function CreatePost({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState('')

  const handlePost = async () => {
    if (content.trim().length === 0) return

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) return

    const { error } = await supabase.from('posts').insert({
      content,
      user_id: session.user.id,
      username: session.user.user_metadata.full_name || 'anonymous',
    })

    if (!error) {
      setContent('')
      onPostCreated()
    }
  }

  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700 mb-4">
      <textarea
        placeholder="What's on your mind?"
        className="w-full bg-transparent border-none focus:outline-none text-white resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handlePost}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Post
      </button>
    </div>
  )
}
