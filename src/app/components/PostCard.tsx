import React from "react";

export default function PostCard({ post }: { post: any }) {
  return (
    <div className="bg-zinc-800 text-white rounded-lg p-4 mb-4 shadow">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-10 h-10 bg-zinc-600 rounded-full" />
        <div className="text-sm font-semibold">{post.username || "User"}</div>
      </div>
      <div className="text-white mb-2">{post.caption}</div>
      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          className="w-full rounded-md max-h-96 object-cover"
        />
      )}
      <div className="flex items-center space-x-4 mt-3 text-sm">
        <span>❤️ {post.likes || 0}</span>
        <span>💬 {post.comments?.length || 0} Comments</span>
      </div>
    </div>
  );
}
