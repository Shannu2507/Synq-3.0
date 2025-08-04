"use client";

import { useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function CreatePost() {
  const [content, setContent] = useState("");

  const handlePost = async () => {
    if (!content.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase.from("posts").insert({
      content,
      user_id: user.id,
    });

    if (!error) {
      setContent("");
      window.location.reload(); // simple reload to refresh posts
    }
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-lg shadow mb-4">
      <textarea
        className="w-full p-2 bg-zinc-800 text-white rounded resize-none"
        rows={3}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handlePost}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Post
      </button>
    </div>
  );
}
