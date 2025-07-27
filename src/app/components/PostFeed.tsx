"use client";

import { useEffect, useState } from "react";
import { fetchPosts } from "@/lib/fetchPosts";
import { supabase } from "@/lib/supabaseClient"; // ✅ Fix: missing import

type Post = {
  id: string;
  content: string;
  author: string;
  created_at: string;
};

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    }
    loadPosts();

    // ✅ Realtime listener
    const channel = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          const newPost = payload.new as Post;
          setPosts((prev) => [newPost, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
      {loading ? (
        <p className="text-gray-500">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="p-4 rounded-xl shadow bg-white">
            <p className="text-gray-800">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">By {post.author}</p>
          </div>
        ))
      )}
    </div>
  );
}
