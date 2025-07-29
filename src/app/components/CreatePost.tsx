'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CreatePost() {
  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit triggered');

    const { error } = await supabase.from('posts').insert([
      {
        name: name.trim() || 'Anonymous',
        caption,
        image_url: null,
        likes: 0
      }
    ]);

    if (error) {
      console.error('Insert error:', error.message);
    } else {
      console.log('Post inserted ✅');
      setName('');
      setCaption('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
}
