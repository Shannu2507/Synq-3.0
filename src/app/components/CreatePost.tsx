'use client'

import React, { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function CreatePost() {
  const [caption, setCaption] = useState('')

  async function handlePost() {
    await supabase.from('posts').insert({ caption })
    setCaption('')
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Write something..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="border px-2 py-1"
      />
      <button onClick={handlePost}>Post</button>
    </div>
  )
}
