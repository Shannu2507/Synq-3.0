"use client"

import { supabase } from "@/lib/supabaseClient"
import { useContext } from "react"
import { SessionContext } from "@/lib/SessionContext" // adjust if your context path is different

type Props = {
  id: string
  userId: string
  username: string
  content: string
  imageUrl: string | null
  likes: number
}

export default function PostCard({ id, userId, username, content, imageUrl, likes }: Props) {
  const { session } = useContext(SessionContext) // read session from your context
  const isOwner = session?.user?.id === userId

  const deletePost = async () => {
    await supabase.from("posts").delete().eq("id", id)
    window.location.reload()
  }

  return (
    <div className="bg-white/5 p-4 rounded-xl shadow-sm space-y-2">
      <div className="flex justify-between text-sm text-white/80 font-semibold">
        <span>@{username}</span>
        {isOwner && (
          <button onClick={deletePost} className="text-red-400 hover:underline">
            Delete
          </button>
        )}
      </div>
      <p className="text-white">{content}</p>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="post"
          className="w-full rounded-lg border border-white/10 mt-2"
        />
      )}
      <div className="flex justify-start gap-4 pt-2 text-sm text-white/70">
        <span>❤️ {likes}</span>
        <span>💬 0</span>
        <span>🔁</span>
      </div>
    </div>
  )
}
