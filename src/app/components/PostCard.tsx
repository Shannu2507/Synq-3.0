'use client'

import supabase from '../../lib/supabaseClient'
import { useState, useEffect } from 'react'

export default function PostCard({ post, session }: { post: any; session: any }) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    checkIfLiked()
  }, [])

  const checkIfLiked = async () => {
    const user = session?.user
    if (!user) return

    const { data } = await supabase
      .from('likes')
      .select('*')
      .eq('post_id', post.id)
      .eq('user_id', user.id)

    if (data && data.length > 0) {
      setLiked(true)
    }
  }

  const toggleLike = async () => {
    const user = session?.user
    if (!user) return

    if (liked) {
      await supabase
        .from('likes')
        .delete()
        .eq('post_id', post.id)
        .eq('user_id', user.id)
    } else {
      await supabase.from('likes').insert({
        post_id: post.id,
        user_id: user.id,
      })
    }

    setLiked(!liked)
  }

  return (
    <div className="bg-zinc-900 p-4 rounded shadow text-white">
      <div className="font-semibold text-cyan-400 mb-2">{post.username}</div>
      <div className="mb-2">{post.content}</div>
      <button
        onClick={toggleLike}
        className="text-sm text-cyan-400 hover:underline"
      >
        {liked ? 'Unlike' : 'Like'}
      </button>
    </div>
  )
}
