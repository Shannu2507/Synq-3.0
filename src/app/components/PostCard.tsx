"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Post } from "./PostFeed";

interface Props {
  post: Post;
  onRefresh: () => void;
}

export default function PostCard({ post, onRefresh }: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const fetchUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setUserId(session?.user.id || null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLike = async () => {
    if (!userId) return;

    const { data: existingLike } = await supabase
      .from("likes")
      .select("*")
      .eq("post_id", post.id)
      .eq("user_id", userId)
      .single();

    if (!existingLike) {
      await supabase.from("likes").insert({ post_id: post.id, user_id: userId });
      onRefresh();
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    await supabase.from("comments").insert({
      post_id: post.id,
      user_id: userId,
      content: commentText,
    });

    setCommentText("");
    onRefresh();
  };

  const handleDelete = async () => {
    await supabase.from("posts").delete().eq("id", post.id);
    onRefresh();
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-md border border-zinc-700">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={post.profiles?.profile_picture || "/default-avatar.png"}
          alt="pfp"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-white font-medium">{post.profiles?.username}</span>
      </div>

      <p className="text-zinc-200 mb-3">{post.content}</p>

      <div className="flex items-center gap-4 text-sm text-zinc-400">
        <button onClick={handleLike}>
          ❤️ {post.likes?.length || 0}
        </button>
        <button onClick={() => setShowComments(!showComments)}>
          💬 {post.comments?.length || 0}
        </button>
        {userId === post.user_id && (
          <button onClick={handleDelete} className="text-red-500 ml-auto">
            Delete
          </button>
        )}
      </div>

      {showComments && (
        <div className="mt-3 space-y-2">
          {post.comments?.map((comment) => (
            <div
              key={comment.id}
              className="bg-zinc-800 p-2 rounded text-zinc-300 text-sm"
            >
              {comment.content}
            </div>
          ))}
          <div className="flex mt-2">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-zinc-800 text-white p-2 rounded-l border border-zinc-700"
            />
            <button
              onClick={handleComment}
              className="bg-blue-600 text-white px-4 rounded-r"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
