"use client";

import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import supabase from "@/lib/supabaseClient";

export interface Post {
  id: number;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
    profile_picture: string | null;
  };
  likes: {
    user_id: string;
  }[];
  comments: {
    id: number;
    content: string;
    user_id: string;
    created_at: string;
  }[];
}

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `id, content, created_at, user_id,
         profiles (username, profile_picture),
         likes (user_id),
         comments (id, content, user_id, created_at)`
      )
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPosts(data as Post[]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onRefresh={fetchPosts} />
      ))}
    </div>
  );
}
