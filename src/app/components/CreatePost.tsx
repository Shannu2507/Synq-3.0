"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
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
        name: name || "Anonymous",
      },
    ])

    setCaption("")
    setName("")
    setImage(null)
    setLoading(false)
  }

  return (
    <div className="p-4 border rounded-2xl shadow-xl bg-gradient-to-br from-white via-zinc-100 to-white dark:from-[#1a1a1a] dark:to-[#2c2c2c] w-full max-w-xl mx-auto my-6 backdrop-blur-md">
      <h2 className
