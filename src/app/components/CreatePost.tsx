'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CreatePost() {
  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl: string | null = null;

      // Upload image if one is selected
      if (image) {
        const fileName = `${Date.now()}-${image.name}`;
        const { data, error: uploadError } = await supabase.storage
          .from('images') // make sure this bucket exists
          .upload(fileName, image);

        if (uploadError) {
          console.error('Image upload error:', uploadError.message);
          setLoading(false);
          return;
        }

        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

      const { error } = await supabase.from('posts').insert([
        {
          name: name.trim() || 'Anonymous',
          caption: caption.trim(),
          image_url: imageUrl,
          likes: 0
        }
      ]);

      if (error) {
        console.error('Post insert error:', error.message);
      } else {
        console.log('Post uploaded ✅');
        setName('');
        setCaption('');
        setImage(null);
      }
    } catch (err) {
      console.error('Unhandled error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-[#111] text-white rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-2 p-2 bg-[#1a1a1a] text-white border border-gray-700 rounded"
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
        className="mb-2"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
}
