'use client';

import { useEffect, useState } from 'react';
import supabase from '../../../lib/supabaseClient'; // ✅ fixed path
import { formatDistanceToNow } from 'date-fns';
import LikeButton from '../components/LikeButton';

export default function ExplorePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserId(session?.user?.id ?? null);
    };

    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('id, content, created_at, user_id, username')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data || []);
      }

      setLoading(false);
    };

    getUser();
    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    const { error } = await supabase.from('posts').delete().eq('id', postId);
    if (error) {
      console.error('Delete failed:', error);
    } else {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Explore</h1>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-zinc-900 p-4 rounded-xl shadow-md border border-zinc-700"
            >
              <div className="text-sm text-zinc-400">
                @{post.username} •{' '}
                {formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })}
              </div>
              <p className="text-lg mt-2">{post.content}</p>

              <LikeButton postId={post.id} userId={userId} />

              {userId === post.user_id && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="mt-3 text-red-500 text-sm hover:underline"
                >
                  Delete Post
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
