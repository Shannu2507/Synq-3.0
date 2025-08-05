'use client';

import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import supabase from '../lib/supabaseClient'; // ✅ fixed path
import TopNav from './components/TopNav';
import ProfilePage from './components/ProfilePage';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    };

    getSession();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <TopNav />
      {!session ? (
        <div className="flex justify-center items-center h-screen">
          <button
            onClick={async () => {
              await supabase.auth.signInWithOAuth({
                provider: 'google',
              });
            }}
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="p-4">
          <ProfilePage />
        </div>
      )}
    </div>
  );
}
