"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

interface Props {
  post: {
    id: number;
    content: string;
    user_id: string;
    created_at: string;
  };
  session: Session;
}

export default function PostCard({ post, session }: Props) {
  const supabase = createClient();
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchLikes();
    checkUserLike();
  }, []);

  const fetchLikes = async () => {
    const { count } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", post.id);

    setLikeCount(count || 0);
  };

  const checkUserLike = async () => {
    const { data } = await supabase
      .from("likes")
      .select("*")
      .eq("post_id", post.id)
      .eq("user_id", session.user.id)
      .single();

    setLiked(!!data);
  };

  const toggleLike = async () => {
    if (liked) {
      await supabase
        .from("likes")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", session.user.id);
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      await supabase.from("likes").insert({
        post_id: post.id,
        user_id: session.user.id,
      });
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  return (
    <div className="border border-gray-700 p-4 rounded-lg bg-[#1a1a1a]">
      <p className="mb-2">{post.content}</p>
      <button onClick={toggleLike} className="flex items-center gap-2 text-sm">
        {liked ? "❤️ Liked" : "🤍 Like"} {likeCount} likes
      </button>
    </div>
  );
}
