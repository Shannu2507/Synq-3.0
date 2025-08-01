"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PostCard({ post, currentUser }: { post: any; currentUser: any }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isOwner = currentUser?.id === post.user_id;

  useEffect(() => {
    if (post.image_url) {
      setImageUrl(post.image_url);
    }
    setLoading(false);
  }, [post.image_url]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", post.id)
      .eq("user_id", currentUser.id);

    if (error) {
      console.error("Error deleting post:", error.message);
    } else {
      alert("Post deleted!");
      location.reload(); // reload to reflect changes
    }
  };

  if (loading) return <div className="text-white">Loading post...</div>;

  return (
    <div className="bg-zinc-900 text-white p-4 rounded-md shadow-md space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">{post.name || "Anonymous"}</p>
        {isOwner && (
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-600 text-xs"
          >
            Delete
          </button>
        )}
      </div>
      <p>{post.caption}</p>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Post"
          className="w-full h-auto rounded mt-2"
        />
      )}
    </div>
  );
}
