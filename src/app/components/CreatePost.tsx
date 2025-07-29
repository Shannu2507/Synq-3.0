'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CreatePost() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.from('posts').insert([
      {
        name,
        caption,
        image_url: image ? URL.createObjectURL(image) : null,
      }
    ]);

    if (error) {
      console.error('Error creating post:', error.message);
    } else {
      setCaption('');
      setImage(null);
      setName('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-[#111] text-white rounded-lg shadow-md"
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-2 p-2 bg-[#1a1a1a] text-white border border-gray-700 rounded"
        required
      />
      <textarea
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full mb-2 p-2 bg-[#1a1a1a] text-white border border-gray-700 rounded"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="mb-2 text-sm"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Post
      </button>
    </form>
  );
}
