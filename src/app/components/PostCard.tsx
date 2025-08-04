'use client'

import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'

interface Props {
  post: any
  currentUser: any
}

// Keeping time ago function for later use
function getTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds)
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`
    }
  }

  return 'just now'
}

export default function PostCard({ post, currentUser }: Props) {
  const [likes, setLikes] = useState<number>(post.likes || 0)
  const [comments, setComments] = useState<any[]>([])
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  // Debug: what PostCard receives
  console.log('🧩 PostCard Received:', post)

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true })

    if (!error && data) {
      setComments(data)
    }
  }

  const handleLike = async () => {
    const { data: existingLikes, error: likeCheckError } = await supabase
      .from('likes')
      .select('*')
      .eq('post_id', post.id)
      .eq('user_id', currentUser.id)

    if (likeCheckError || existingLikes.length > 0) {
      return
    }

    const { error: likeError } = await supabase.from('likes').insert([
      {
        post_id: post.id,
        user_id: currentUser.id,
      },
    ])

    if (!likeError) {
      setLikes((prev) => prev + 1)
    }
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    const { error } = await supabase.from('comments').insert([
      {
        post_id: post.id,
        user_id: currentUser.id,
        content: newComment,
      },
    ])

    if (!error) {
      setNewComment('')
      fetchComments()
    }
  }

  return (
    <div className="bg-[#111] border border-neutral-800 p-4 rounded-md shadow-sm mb-4">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-300">{post.username}</p>
        {/* TEMP: Show raw created_at directly */}
        <p className="text-sm text-white">{post.created_at || 'no timestamp'}</p>
      </div>
      <p className="text-white mb-4">{post.content}</p>
      <div className="flex items-center space-x-4 text-sm text-gray-400">
        <button onClick={handleLike} className="hover:text-red-400 transition">
          ❤️ {likes}
        </button>
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="hover:text-blue-400 transition"
        >
          💬 {comments.length}
        </button>
      </div>
      {showComments && (
        <div className="mt-3 space-y-2">
          {comments.map((comment) => (
            <p key={comment.id} className="text-sm text-gray-300">
              {comment.content}
            </p>
          ))}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Add comment..."
              className="flex-1 px-2 py-1 bg-neutral-900 text-white border border-neutral-700 rounded"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
