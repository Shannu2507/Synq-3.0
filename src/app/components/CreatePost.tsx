'use client'

import { useState } from 'react'
import supabase from '../../lib/supabaseClient'

export default function CreatePost({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    const user = (await supabase.auth.getUser()).data.user
    if (!user) {
      alert('Not logged in')
      return
    }

    const { error } = await supabase.from('posts').insert([
      {
        content,
        user_id: user.id,
        username: user.user_metadata?.name || 'Anonymous',
      },
    ])

    setLoading(false)
    if (!error) {
      setContent('')
      onPostCreated()
    } else {
      alert('Error creating post')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="w-full p-2 rounded bg-zinc-900 text-white"
        rows={4}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-2 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
    </form>
  )
}
