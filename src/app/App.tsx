"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostFeed from "./components/PostFeed";
import UserSync from "./components/UserSync";

export default function App() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
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
      </div>
      <UserSync />
    </div>
  );
}
