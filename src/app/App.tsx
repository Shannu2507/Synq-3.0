'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Sidebar from './components/Sidebar';
import PostFeed from './components/PostFeed';
import CreatePost from './components/CreatePost';
import ProfilePage from './components/ProfilePage';
import ExplorePage from './components/ExplorePage';
import UserSync from './components/UserSync';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'profile' | 'explore'>('home');

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-950 text-white">
        <button
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
          className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4 max-w-2xl mx-auto mt-6">
        <UserSync />
        {activeTab === 'home' && (
          <>
            <CreatePost user={user} />
            <PostFeed />
          </>
        )}
        {activeTab === 'explore' && <ExplorePage />}
        {activeTab === 'profile' && (
          <ProfilePage user={user} onLogout={handleLogout} />
        )}
      </main>
    </div>
  );
}
