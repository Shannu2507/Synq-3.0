'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function CreatePost() {
  const [session, setSession] = useState<any>(null)
  const [content, setContent] = useState('')

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
    }

    getSession()
  }, [])

  const handleSubmit = async () => {
    if (!content.trim() || !session?.user) return

    const { error } = await supabase.from('posts').insert({
      content: content.trim(),
      user_id: session.user.id,
    })

    if (error) {
      console.error('Error creating post:', error.message)
    } else {
      setContent('')
    }
  }

  if (!session) {
    return null
  }

  return (
    <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 rounded-md border dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-black dark:text-white"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
      >
        Post
      </button>
    </div>
  )
}
