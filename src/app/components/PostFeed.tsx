"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

interface Post {
  id: string
  caption?: string
  image_url?: string
  author?: string
  likes?: number
  created_at: string
}

interface Comment {
  id: string
  text: string
  author?: string
  created_at: string
  post_id: string
}

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [newComments, setNewComments] = useState<Record<string, string>>({})
  const [commentNames, setCommentNames] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchPosts()
    fetchComments()

    const postChannel = supabase
      .channel("public:posts")
      .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, fetchPosts)
      .subscribe()

    const commentChannel = supabase
      .channel("public:comments")
      .on("postgres_changes", { event: "*", schema: "public", table: "comments" }, fetchComments)
      .subscribe()

    return () => {
      postChannel.unsubscribe()
      commentChannel.unsubscribe()
    }
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
    if (!error && data) setPosts(data)
  }

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: true })
    if (!error && data) setComments(data)
  }

  const handleLike = async (postId: string) => {
    const post = posts.find((p) => p.id === postId)
    if (!post) return

    const { error } = await supabase
      .from("posts")
      .update({ likes: (post.likes || 0) + 1 })
      .eq("id", postId)

    if (!error) fetchPosts()
  }

  const handleCommentChange = (postId: string, value: string) => {
    setNewComments({ ...newComments, [postId]: value })
  }

  const handleNameChange = (postId: string, value: string) => {
    setCommentNames({ ...commentNames, [postId]: value })
  }

  const handleCommentSubmit = async (postId: string) => {
    const text = newComments[postId]
    const author = commentNames[postId] || "Anonymous"
    if (!text) return

    const { error } = await supabase.from("comments").insert([
      {
        post_id: postId,
        text,
        author,
      },
    ])

    if (!error) {
      setNewComments({ ...newComments, [postId]: "" })
    }
  }

  const getCommentsForPost = (postId: string) => {
    return comments.filter((c) => c.post_id === postId)
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-6 space-y-4">
      {posts
        .filter((post) => post.caption || post.image_url)
        .map((post) => (
          <div key={post.id} className="bg-white shadow rounded-lg overflow-hidden border">
            {post.image_url && (
              <img src={post.image_url} alt="Post" className="w-full object-cover" />
            )}
            <div className="p-4">
              <div className="text-sm font-semibold text-gray-700 mb-1">
                {post.author || "Anonymous"}
              </div>

              {post.caption && <p className="text-sm text-gray-800 mb-2">{post.caption}</p>}

              <button
                onClick={() => handleLike(post.id)}
                className="text-sm text-red-500 hover:underline mr-2"
              >
                ❤️ {post.likes || 0} Like{(post.likes || 0) === 1 ? "" : "s"}
              </button>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={commentNames[post.id] || ""}
                  onChange={(e) => handleNameChange(post.id, e.target.value)}
                  className="w-full text-sm px-2 py-1 border rounded mb-2"
                />
                <textarea
                  placeholder="Write a comment..."
                  value={newComments[post.id] || ""}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  className="w-full text-sm px-2 py-1 border rounded"
                  rows={2}
                />
                <button
                  onClick={() => handleCommentSubmit(post.id)}
                  className="mt-1 text-sm text-blue-600 hover:underline"
                >
                  Post Comment
                </button>
              </div>

              <div className="mt-3 space-y-1">
                {getCommentsForPost(post.id).map((comment) => (
                  <div key={comment.id} className="text-sm text-gray-700 border-t pt-2">
                    <span className="font-semibold mr-1">{comment.author || "Anon"}:</span>
                    {comment.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
