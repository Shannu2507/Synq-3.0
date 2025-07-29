'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Heart, MessageCircle } from 'lucide-react';

interface PostCardProps {
  id: number;
  name: string;
  caption: string;
  image_url?: string;
  likes?: number;
}

export default function PostCard({
  id,
  name,
  caption,
  image_url,
  likes = 0
}: PostCardProps) {
  const [likeCount, setLikeCount] = useState(likes);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);

  const handleLike = async () => {
    const newLikes = likeCount + 1;
    setLikeCount(newLikes);
    await supabase.from('posts').update({ likes: newLikes }).eq('id', id);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === '') return;

    const { error } = await supabase.from('comments').insert([
      {
        post_id: id,
        text: comment.trim()
      }
    ]);

    if (!error) {
      setComment('');
      fetchComments(); // Refresh comment list
    } else {
      console.error('Comment error:', error.message);
    }
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('text')
      .eq('post_id', id)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setComments(data.map((c) => c.text));
    }
  };

  useEffect(() => {
    if (showCommentBox) {
      fetchComments();
    }
  }, [showCommentBox]);

  return (
    <div className="bg-[#111] text-white rounded-lg shadow-md p-4 mb-4">
      <p className="text-sm text-gray-400 mb-1 font-semibold">{name || 'Anonymous'}</p>
      <p className="text-base">{caption}</p>

      {image_url && (
        <img
          src={image_url}
          alt="Post"
          className="mt-2 rounded-md max-h-80 object-cover w-full"
        />
      )}

      <div className="flex justify-between mt-4 text-gray-400">
        <button onClick={handleLike} className="flex items-center gap-1 hover:text-red-400">
          <Heart size={18} strokeWidth={1.5} /> {likeCount}
        </button>
        <button
          onClick={() => setShowCommentBox(!showCommentBox)}
          className="hover:text-blue-400"
        >
          <MessageCircle size={18} strokeWidth={1.5} />
        </button>
      </div>

      {showCommentBox && (
        <div className="mt-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 mt-2 text-sm bg-[#1a1a1a] text-white border border-gray-700 rounded"
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-1 px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Comment
          </button>

          {comments.length > 0 && (
            <div className="mt-4 space-y-2 text-sm text-gray-300">
              {comments.map((c, idx) => (
                <div key={idx} className="bg-[#1a1a1a] p-2 rounded">
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
