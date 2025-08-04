"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import PostCard from "./PostCard";

interface Props {
  session: Session;
}

interface Post {
  id: number;
  content: string;
  user_id: string;
  created_at: string;
}

export default function PostFeed({ session }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const supabase = createClient();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPosts(data as Post[]);
    if (error) console.error("Failed to fetch posts:", error);
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} session={session} />
      ))}
    </div>
  );
}
