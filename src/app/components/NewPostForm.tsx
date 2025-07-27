"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function NewPostForm() {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content || !author) return;

    setLoading(true);
    const { error } = await supabase.from("posts").insert([{ content, author }]);
    setLoading(false);

    if (error) {
      console.error("Error adding post:", error.message);
    } else {
      setContent("");
      setAuthor("");
      window.location.reload(); // TEMP fix — will upgrade to live updates later
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold">Create a New Post</h2>
      <input
        type="text"
        placeholder="Your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded h-24"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
