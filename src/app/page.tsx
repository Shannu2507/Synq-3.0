'use client';

import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import CreatePost from './components/CreatePost';
import PostFeed from './components/PostFeed';
import TopNav from './components/TopNav';
import ProfilePage from './profile/ProfilePage';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [page, setPage] = useState('home');

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const fetchPosts = () => {
    // Optionally refetch posts if needed
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <button
          onClick={handleSignIn}
          className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <TopNav onNavigate={setPage} onSignOut={handleSignOut} />
      <div className="max-w-2xl mx-auto px-4">
        {page === 'home' && (
          <>
            <CreatePost onPostCreated={fetchPosts} />
            <PostFeed />
          </>
        )}
        {page === 'profile' && <ProfilePage session={session} />}
        {page === 'explore' && (
          <p className="text-center text-gray-400 mt-10">Explore Coming Soon</p>
        )}
      </div>
    </div>
  );
}
