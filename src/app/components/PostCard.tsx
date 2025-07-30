'use client'

import React from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Heart, MessageCircle } from 'lucide-react'

export default function PostCard({ post }: { post: any }) {
  return (
    <div className="border p-4 my-2 bg-white rounded-md">
      <p className="text-black">{post.caption}</p>
      <div className="flex gap-4 mt-2">
        <Heart className="w-5 h-5 text-red-500" />
        <MessageCircle className="w-5 h-5 text-blue-500" />
      </div>
    </div>
  )
}

