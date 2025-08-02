// src/app/components/CreatePost.tsx
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type Props = {
  user: any
}

export default function CreatePost({ user }: Props) {
  const [caption, setCaption] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const handlePost = async () => {
    if (!caption.trim()) return

    let imageUrl = null

    if (image) {
      const fileExt = image.name.split(".").pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { data, error } = await supabase.storage
        .from("post-images")
        .upload(fileName, image)

      if (!error) {
        imageUrl = supabase.storage.from("post-images").getPublicUrl(fileName).data.publicUrl
      }
    }

    await supabase.from("posts").insert({
      user_id: user.id,
      caption,
      image_url: imageUrl,
      name: user.user_metadata?.full_name || "Anonymous",
    })

    setCaption("")
    setImage(null)
  }

  return (
    <div className="bg-[#1a1a1a] p-4 rounded-2xl shadow mb-4">
      <textarea
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full bg-[#111] text-white p-2 rounded resize-none outline-none"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="mt-2 text-sm text-gray-400"
      />
      <button
        onClick={handlePost}
        className="mt-2 bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
      >
        Post
      </button>
    </div>
  )
}
