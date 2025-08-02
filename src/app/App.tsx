"use client";

import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostFeed from "./components/PostFeed";
import Explore from "./components/Explore";
import ProfilePage from "./components/ProfilePage";
import UserSync from "./components/UserSync";

export default function App() {
  const session = useSession();
  const user = session?.user;

  const [activeTab, setActiveTab] = useState<"home" | "explore" | "profile">("home");

  useEffect(() => {
    if (!session) {
      setActiveTab("home");
    }
  }, [session]);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-4 max-w-2xl mx-auto mt-6">
        <UserSync />
        {activeTab === "home" && user && (
          <>
            <CreatePost user={user} />
            <PostFeed user={user} />
          </>
        )}
        {activeTab === "explore" && <Explore />}
        {activeTab === "profile" && user && <ProfilePage user={user} />}
      </main>
    </div>
  );
}
