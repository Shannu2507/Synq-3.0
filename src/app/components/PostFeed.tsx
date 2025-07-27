"use client";

import { useEffect, useState } from "react";
import { fetchPosts } from "@/lib/fetchPosts";
import { formatDistanceToNow } from "date-fns";

type Post = {
  id: string;
  content: string;
  author: string;
  created_at: string;
};

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const data = await fetchPosts();
      console.log("📦 Posts fetched from Supabase:", data);
      setPosts(data);
    }

    loadPosts();

    // Realtime listener (already working)
    const channel = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          console.log("🔁 New realtime payload:", payload);
          loadPosts();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
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
            <p className="text-sm text-gray-500 mt-2">
              By {post.author} • {formatDistanceToNow(new Date(post.created_at))} ago
            </p>
          </div>
        ))
      )}
    </div>
  );
}
