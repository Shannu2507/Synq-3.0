'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

interface CreatePostProps {
  user: User | null;
}

export default function CreatePost({ user }: CreatePostProps) {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handlePost = async () => {
    if (!user || !caption.trim()) return;

    const { error } = await supabase.from('posts').insert([
      {
        name: user.user_metadata.name,
        caption: caption,
        image_url: imageUrl || null,
        likes: 0,
      },
    ]);

    if (error) {
      console.error('Error posting:', error.message);
    } else {
      setCaption('');
      setImageUrl('');
    }
  };

  if (!user) return <p className="text-gray-500">Sign in to post something</p>;

  return (
    <div className="bg-gray-900 p-4 rounded-xl space-y-2">
      <textarea
        className="w-full p-2 rounded bg-gray-800 text-white"
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-800 text-white"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button
        onClick={handlePost}
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        Post
      </button>
    </div>
  );
}
