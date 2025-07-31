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
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePost = async () => {
    if (!caption && !image) return;

    setUploading(true);

    let imageUrl = null;

    if (image) {
      const fileExt = image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, image);

      if (uploadError) {
        console.error("Image upload failed:", uploadError);
        setUploading(false);
        return;
      }

      const { data } = supabase.storage.from("images").getPublicUrl(filePath);
      imageUrl = data.publicUrl;
    }

    const { error: insertError } = await supabase.from("posts").insert([
      {
        user_id: user?.id,
        caption,
        image_url: imageUrl,
        username: user?.user_metadata?.full_name || user?.email || "Anonymous",
      },
    ]);

    if (insertError) {
      console.error("Post insert failed:", insertError);
    }

    setCaption("");
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setUploading(false);
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-2xl shadow-md space-y-4">
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 rounded-md bg-zinc-800 text-white resize-none h-24"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="text-white"
      />
      {image && (
        <div className="mt-2">
          <Image
            src={URL.createObjectURL(image)}
            alt="Selected"
            width={300}
            height={200}
            className="rounded-md"
          />
        </div>
      )}
      <button
        onClick={handlePost}
        disabled={uploading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        {uploading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
