"use client"

import { useState } from "react"
import { supabase } from "../../supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CreatePost() {
  const [caption, setCaption] = useState("")
  const [name, setName] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handlePost = async () => {
    if (!caption && !image) return
    setLoading(true)

    let imageUrl = null
    if (image) {
      const fileExt = image.name.split(".").pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, image)

      if (data) {
        const { data: urlData } = supabase.storage
          .from("images")
          .getPublicUrl(fileName)
        imageUrl = urlData?.publicUrl
      }
    }

    await supabase.from("posts").insert([
      {
        caption,
        image_url: imageUrl,
        name: name || "Anonymous"
      },
    ])

    setCaption("")
    setName("")
    setImage(null)
    setLoading(false)
  }

  return (
    <div className="p-4 border rounded-2xl shadow-xl bg-gradient-to-br from-white via-zinc-100 to-white dark:from-[#1a1a1a] dark:to-[#2c2c2c] w-full max-w-xl mx-auto my-6 backdrop-blur-md">
      <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">Drop your vibe</h2>

      <Input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-3 rounded-xl border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
      />

      <textarea
        placeholder="What's happening?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        rows={3}
        className="w-full p-3 mb-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <Input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="mb-4 file:bg-blue-600 file:text-white file:rounded-full file:px-4 file:py-1 file:border-none dark:file:bg-blue-500"
      />

      <Button
        onClick={handlePost}
        disabled={loading || (!caption && !image)}
        className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-pink-600 hover:to-purple-600 transition-colors text-white font-semibold shadow-md disabled:opacity-60"
      >
        {loading ? "Posting..." : "Post it 🔥"}
      </Button>
    </div>
  )
}
