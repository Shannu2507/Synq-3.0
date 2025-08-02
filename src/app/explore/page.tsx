"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ExplorePage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
      if (data) setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-700 p-4 rounded">
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
