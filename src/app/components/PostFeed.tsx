"use client";

import { useEffect, useState } from "react";
import { fetchPosts } from "@/lib/fetchPosts";

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
      console.log("📦 Posts fetched from Supabase:", data); // Debug log
      setPosts(data);
    }
    loadPosts();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
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
