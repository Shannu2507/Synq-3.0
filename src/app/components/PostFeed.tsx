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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    }

    loadPosts();

    // Realtime listener (already working)
    const channel = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          loadPosts(); // Re-fetch on new post
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
