"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

interface Props {
  session: Session;
}

export default function CreatePost({ session }: Props) {
  const [content, setContent] = useState("");
  const supabase = createClient();

  const handlePost = async () => {
    if (!content.trim()) return;

    await supabase.from("posts").insert([
      {
        content,
        user_id: session.user.id,
      },
    ]);

    setContent("");
  };

  return (
    <div className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-3 rounded bg-[#1a1a1a] text-white border border-gray-600"
      />
      <button
        onClick={handlePost}
        className="mt-2 px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
      >
        Post
      </button>
    </div>
  );
}
