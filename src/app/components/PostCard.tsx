"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Post {
  id: number;
  name?: string;
  caption: string;
  image_url?: string;
  created_at: string;
  user_id: string;
}

export default function PostCard({ post }: { post: Post }) {
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", post.id)
      .eq("user_id", currentUserId);

    if (!error) {
      alert("Post deleted.");
      window.location.reload(); // Reload to reflect deletion
    }
  };

  return (
    <div className="bg-zinc-900 p-4 rounded shadow-md mb-4 text-white relative">
      <p className="text-sm text-gray-400 mb-1">{post.name || "Anonymous"}</p>
      <p className="mb-2">{post.caption}</p>
      {post.image_url && (
        <img src={post.image_url} alt="Post" className="w-full max-h-80 object-cover rounded mb-2" />
      )}

      <div className="flex items-center gap-4 text-gray-400 text-sm">
        <button onClick={handleLike} className="hover:text-white">♡ {likes}</button>
        <button onClick={() => setShowComments((prev) => !prev)} className="hover:text-white">💬</button>
        {currentUserId === post.user_id && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 ml-auto"
          >
            🗑 Delete
          </button>
        )}
      </div>

      {showComments && (
        <div className="mt-2 text-sm text-gray-400">
          {/* Comments section could go here */}
          Comments coming soon...
        </div>
      )}
    </div>
  );
}

}
