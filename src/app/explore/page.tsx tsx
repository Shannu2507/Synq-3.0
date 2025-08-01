// src/app/explore/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Post {
  id: string;
  content: string;
  created_at: string;
  name?: string;
  image_url?: string;
}

export default function ExplorePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-zinc-900 p-4 rounded shadow">
            <p className="text-sm text-gray-400">{post.name}</p>
            <p className="text-lg">{post.content}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt="Post"
                className="mt-2 max-h-64 rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
