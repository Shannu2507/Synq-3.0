'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function CreatePost() {
  const [caption, setCaption] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const handlePost = async () => {
    let imageUrl = null

    if (image) {
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`public/${Date.now()}-${image.name}`, image)

      if (!error && data) {
        imageUrl = supabase.storage.from('images').getPublicUrl(data.path).data.publicUrl
      }
    }

    await supabase.from('posts').insert({ caption, name, image: imageUrl })
    setCaption('')
    setName('')
    setImage(null)
  }

  return (
    <div className="space-y-2 p-4 border rounded bg-white">
      <input
        className="border px-2 py-1 w-full"
        placeholder="Name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="border px-2 py-1 w-full"
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <button onClick={handlePost} className="bg-black text-white px-4 py-1 rounded">
        Post
      </button>
    </div>
  )
}
