"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostFeed from "./components/PostFeed";
import UserSync from "./components/UserSync";
import ProfilePage from "./components/ProfilePage";
import ExplorePage from "./components/ExplorePage";
import { supabase } from "@/lib/supabaseClient"; 

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "explore" | "profile">("home");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4 max-w-2xl mx-auto mt-6">
        <UserSync />
        {activeTab === "home" && (
          <>
            <CreatePost user={user} />
            <PostFeed />
          </>
        )}
        {activeTab === "explore" && <ExplorePage />}
        {activeTab === "profile" && <ProfilePage user={user} onLogout={handleLogout} />}
      </main>
    </div>
  );
}
