'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useSession } from '@/lib/useSession'

type Post = {
  id: string
  content: string
  created_at: string
  user_id: string
}

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [likes, setLikes] = useState<{ [postId: string]: number }>({})
  const [userLikes, setUserLikes] = useState<{ [postId: string]: boolean }>({})
  const { session } = useSession()

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (session?.user.id) {
      fetchUserLikes(session.user.id)
    }
  }, [session])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching posts:', error.message)
    } else {
      setPosts(data || [])
      fetchLikes(data || [])
    }
  }

  const fetchLikes = async (postList: Post[]) => {
    const { data, error } = await supabase.from('likes').select('post_id')

    if (error) {
      console.error('Error fetching likes:', error.message)
      return
    }

    const likeCounts: { [postId: string]: number } = {}
    data?.forEach((like) => {
      likeCounts[like.post_id] = (likeCounts[like.post_id] || 0) + 1
    })
    setLikes(likeCounts)
  }

  const fetchUserLikes = async (userId: string) => {
    const { data, error } = await supabase
      .from('likes')
      .select('post_id')
      .eq('user_id', userId)

    if (error) {
      console.error('Error fetching user likes:', error.message)
      return
    }

    const liked: { [postId: string]: boolean } = {}
    data?.forEach((like) => {
      liked[like.post_id] = true
    })
    setUserLikes(liked)
  }

  const handleLike = async (postId: string) => {
    if (!session) return
    const userId = session.user.id

    const alreadyLiked = userLikes[postId]

    if (alreadyLiked) {
      // Unlike
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', userId)
        .eq('post_id', postId)

      if (!error) {
        setUserLikes((prev) => ({ ...prev, [postId]: false }))
        setLikes((prev) => ({
          ...prev,
          [postId]: (prev[postId] || 1) - 1,
        }))
      }
    } else {
      // Like
      const { error } = await supabase.from('likes').insert({
        user_id: userId,
        post_id: postId,
      })

      if (!error) {
        setUserLikes((prev) => ({ ...prev, [postId]: true }))
        setLikes((prev) => ({
          ...prev,
          [postId]: (prev[postId] || 0) + 1,
        }))
      }
    }
  }

  return (
    <div className="p-4 space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-neutral-900 p-4 rounded-xl shadow"
        >
          <p className="text-sm text-neutral-800 dark:text-neutral-200">{post.content}</p>
          <div className="flex items-center mt-2 space-x-4 text-sm text-neutral-600 dark:text-neutral-400">
            <button onClick={() => handleLike(post.id)}>
              {userLikes[post.id] ? '💖 Unlike' : '🤍 Like'}
            </button>
            <span>{likes[post.id] || 0} likes</span>
          </div>
        </div>
      ))}
    </div>
  )
}
