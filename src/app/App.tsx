"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Sidebar from "../app/components/Sidebar";
import CreatePost from "../app/components/CreatePost";
import PostFeed from "../app/components/PostFeed";
import UserSync from "../app/components/UserSync";

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (!user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        <button
          onClick={async () => {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: "google",
            });
            if (error) console.error("Google Sign-In Error:", error.message);
          }}
          className="bg-white text-black px-6 py-2 rounded-md font-semibold"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="w-1/4 p-4">
        <Sidebar user={user} onLogout={handleLogout} />
      </div>
      <div className="w-3/4 p-4 space-y-4">
        <CreatePost user={user} />
        <PostFeed />
      </div>
      <UserSync user={user} />
    </div>
  );
}
