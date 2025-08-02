"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function CreatePost({ user }: { user: any }) {
  const [caption, setCaption] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let imageUrl = null
    if (image) {
      const { data, error } = await supabase.storage
        .from("post-images")
        .upload(`public/${Date.now()}-${image.name}`, image)

      if (error) {
        console.error("Image upload error:", error.message)
        setLoading(false)
        return
      }

      imageUrl = supabase.storage.from("post-images").getPublicUrl(data.path).data.publicUrl
    }

    const { error: postError } = await supabase.from("posts").insert([
      {
        user_id: user.id,
        caption,
        image_url: imageUrl,
        name: user.user_metadata?.full_name || user.email,
      },
    ])

    if (postError) console.error("Post creation error:", postError.message)

    setCaption("")
    setImage(null)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 p-4 rounded-xl shadow-md mb-6 space-y-4">
      <textarea
        className="w-full p-2 rounded bg-zinc-800 text-white placeholder-zinc-400"
        rows={3}
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="text-white"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  )
}
