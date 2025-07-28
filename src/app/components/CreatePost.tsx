"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function CreatePost() {
  const [caption, setCaption] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handlePost = async () => {
    if (!imageFile || !caption) return alert("Fill all fields")

    setUploading(true)

    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(filePath, imageFile)

    if (uploadError) {
      alert("Image upload failed")
      setUploading(false)
      return
    }

    const { data: imageData } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath)

    const imageUrl = imageData?.publicUrl

    const { error: insertError } = await supabase
      .from("posts")
      .insert([{ caption, image_url: imageUrl }])

    if (insertError) {
      alert("Post creation failed")
    } else {
      alert("Post created!")
      setCaption("")
      setImageFile(null)
    }

    setUploading(false)
  }

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Post</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="mb-3"
      />
      <textarea
        placeholder="Write a caption..."
        className="w-full border rounded p-2 mb-3"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button
        onClick={handlePost}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {uploading ? "Posting..." : "Post"}
      </button>
    </div>
  )
}
