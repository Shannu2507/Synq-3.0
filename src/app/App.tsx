"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Sidebar from "../components/Sidebar";
import PostFeed from "../components/PostFeed";
import CreatePost from "../components/CreatePost";
import UserSync from "../components/UserSync";

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user);
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

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
