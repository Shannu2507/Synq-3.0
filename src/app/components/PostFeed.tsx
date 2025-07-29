'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import PostCard from './PostCard';

interface Post {
  id: number;
  name: string;
  caption: string;
  image_url?: string;
  likes?: number;
}

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          name={post.name}
          caption={post.caption}
          image_url={post.image_url}
          likes={post.likes}
        />
      ))}
    </div>
  );
}
