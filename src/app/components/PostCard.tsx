"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { MessageCircle, Heart } from "lucide-react";

interface Props {
  post: any;
  currentUser: any;
}

export default function PostCard({ post, currentUser }: Props) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const checkLike = async () => {
      const { data } = await supabase
        .from("likes")
        .select("*")
        .eq("user_id", currentUser.id)
        .eq("post_id", post.id)
        .single();

      setHasLiked(!!data);
    };

    checkLike();
  }, [currentUser, post.id]);

  const handleLike = async () => {
    if (!currentUser || hasLiked) return;

    // Insert new like
    const { error } = await supabase.from("likes").insert([
      {
        user_id: currentUser.id,
        post_id: post.id,
      },
    ]);

    if (!error) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);

      // Update post's like count
      await supabase
        .from("posts")
        .update({ likes: likes + 1 })
        .eq("id", post.id);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-md p-4 my-2">
      <p className="font-semibold">{post.username || "Anonymous"}</p>
      <p className="text-white my-2">{post.content}</p>
      <div className="flex items-center gap-4 text-zinc-400 text-sm">
        <button onClick={handleLike} disabled={hasLiked} className="flex items-center gap-1">
          <Heart className={`w-4 h-4 ${hasLiked ? "text-red-500" : ""}`} />
          {likes}
        </button>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          {post.comments_count || 0}
        </div>
      </div>
    </div>
  );
}
