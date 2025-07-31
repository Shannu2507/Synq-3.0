"use client"

import React from "react"

interface PostCardProps {
  name: string
  caption: string
  imageUrl?: string
  likes: number
  onLike: () => void
  onCommentToggle: () => void
  showComments: boolean
}

export default function PostCard({
  name,
  caption,
  imageUrl,
  likes,
  onLike,
  onCommentToggle,
  showComments
}: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 w-full max-w-xl mx-auto">
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
        <span className="font-medium">{name}</span>
      </div>
      <p className="mb-2">{caption}</p>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Post"
          className="w-full h-auto rounded mb-2"
        />
      )}
      <div className="flex items-center gap-4">
        <button onClick={onLike} className="flex items-center gap-1 text-red-500">
          ❤️ <span>{likes}</span>
        </button>
        <button onClick={onCommentToggle} className="text-blue-500">
          💬 {showComments ? "Hide Comments" : "Show Comments"}
        </button>
      </div>
    </div>
  )
}
