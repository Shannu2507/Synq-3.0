"use client";

import { useEffect, useState } from "react";
import { fetchPosts } from "@/lib/fetchPosts";
import { supabase } from "@/lib/supabaseClient";

type Post = {
  id: string;
  content: string;
  author: string;
  created_at: string;
};

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts initially
  useEffect(() => {
    async function loadPosts() {
      const data = await fetchPosts();
      setPosts(data);
    }

    loadPosts();

    // 👇 Real-time listener for new posts
    const channel = supabase
      .channel("posts-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          console.log("🔁 New post inserted:", payload.new);
          setPosts((prev) => [payload.new as Post, ...prev]);
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
      {posts.length === 0 ? (
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
