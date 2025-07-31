"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Sidebar from "./components/Sidebar";
import PostFeed from "./components/PostFeed";
import CreatePost from "./components/CreatePost";
import UserSync from "./components/UserSync";

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

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
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Loading or not signed in...</p>
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
        <UserSync user={user} />
      </div>
    </div>
  );
}
