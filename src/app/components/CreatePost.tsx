"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function CreatePost() {
  const [caption, setCaption] = useState("");

  const handleSubmit = async () => {
    if (!caption) return;
    await supabase.from("posts").insert({ caption });
    setCaption("");
  };

  return (
    <div className="mb-4">
      <textarea
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button onClick={handleSubmit} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Post
      </button>
    </div>
  );
}
