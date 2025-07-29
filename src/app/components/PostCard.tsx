'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Heart, MessageCircle } from 'lucide-react';

interface PostCardProps {
  name: string;
  caption: string;
  image_url?: string;
  id: number;
  likes?: number;
}

export default function PostCard({ name, caption, image_url, id, likes = 0 }: PostCardProps) {
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = async () => {
    const newLikes = likeCount + 1;
    setLikeCount(newLikes);
    await supabase.from('posts').update({ likes: newLikes }).eq('id', id);
  };

  return (
    <div className="bg-[#111] text-white rounded-lg shadow-md p-4 mb-4">
      <p className="text-sm text-gray-400 mb-1 font-semibold">{name || 'Anonymous'}</p>
      <p className="text-base">{caption}</p>
      {image_url && (
        <img
          src={image_url}
          alt="Post"
          className="mt-2 rounded-md max-h-80 object-cover w-full"
        />
      )}
      <div className="flex justify-between mt-4 text-gray-400">
        <button onClick={handleLike} className="flex items-center gap-1 hover:text-red-400">
          <Heart size={18} strokeWidth={1.5} /> {likeCount}
        </button>
        <button className="hover:text-blue-400">
          <MessageCircle size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
