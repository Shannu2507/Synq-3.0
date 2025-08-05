'use client'

import { useEffect, useState } from 'react'
import supabase from '../../lib/supabaseClient'

type Props = {
  postId: string
  userId: string | null
}

export default function LikeButton({ postId, userId }: Props) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    const fetchLikes = async () => {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', postId)

      if (!error && data) {
        setLikeCount(data.length)
        setLiked(data.some((like) => like.user_id === userId))
      }
    }

    fetchLikes()
  }, [postId, userId])

  const toggleLike = async () => {
    if (!userId) return

    if (liked) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId)

      if (!error) {
        setLiked(false)
        setLikeCount((count) => count - 1)
      }
    } else {
      const { error } = await supabase.from('likes').insert({
        post_id: postId,
        user_id: userId,
      })

      if (!error) {
        setLiked(true)
        setLikeCount((count) => count + 1)
      }
    }
  }

  return (
    <button
      onClick={toggleLike}
      className={`mt-2 text-sm ${liked ? 'text-pink-400' : 'text-white'} hover:underline`}
    >
      {liked ? '♥' : '♡'} {likeCount}
    </button>
  )
}
