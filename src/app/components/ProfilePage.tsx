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

export default function ProfilePage({ session }: Props) {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (data) setPosts(data as Post[]);
    if (error) console.error("Failed to fetch user posts:", error);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Your Posts</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} session={session} />
      ))}
    </div>
  );
}
