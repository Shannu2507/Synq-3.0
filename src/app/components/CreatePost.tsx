"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface CreatePostProps {
  user: any;
}

export default function CreatePost({ user }: CreatePostProps) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!caption && !image) return alert("Add a caption or image");

    let imageUrl = "";

    if (image) {
      const { data, error } = await supabase.storage
        .from("posts")
        .upload(`public/${Date.now()}-${image.name}`, image);

      if (error) return alert("Image upload failed");

      const {
        data: { publicUrl },
      } = supabase.storage.from("posts").getPublicUrl(data.path);

      imageUrl = publicUrl;
    }

    await supabase.from("posts").insert([
      {
        caption,
        image_url: imageUrl,
        user_id: user.id,
      },
    ]);

    setCaption("");
    setImage(null);
    window.location.reload();
  };

  return (
    <div className="p-4 bg-zinc-900 rounded-lg mb-6">
      <textarea
        className="w-full p-2 rounded bg-zinc-800 text-white mb-2"
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="text-white mb-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Post
      </button>
    </div>
  );
}
