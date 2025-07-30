'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import PostCard from './PostCard';
import { User } from '@supabase/supabase-js';

interface Post {
  id: number;
  name: string;
  caption: string;
  image_url: string | null;
  likes: number;
}

interface PostFeedProps {
  user: User | null;
}

export default function PostFeed({ user }: PostFeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error.message);
    } else {
      setPosts(data || []);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
