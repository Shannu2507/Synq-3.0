"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabaseClient";
import Image from "next/image";

interface CreatePostProps {
  user: any;
}

export default function CreatePost({ user }: CreatePostProps) {
  const supabase = createClient();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePost = async () => {
    if (!user) return;
    const { data, error } = await supabase.from("posts").insert([
      {
        caption,
        user_id: user.id,
        image_url: image ? image.name : null,
      },
    ]);

    setCaption("");
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <textarea
        placeholder="What's on your mind?"
        className="w-full p-2 rounded bg-gray-800 text-white resize-none"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <div className="flex justify-between items-center mt-2">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImage(file);
          }}
          className="text-sm text-gray-300"
        />
        <button
          onClick={handlePost}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
        >
          Post
        </button>
      </div>
    </div>
  );
}
