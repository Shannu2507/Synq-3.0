"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PostFeed from "./components/PostFeed";
import CreatePost from "./components/CreatePost";
import UserSync from "./components/UserSync";
import Explore from "./components/Explore";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "explore" | "profile">("home");

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4 max-w-2xl mx-auto mt-6">
        <UserSync />
        {activeTab === "home" && (
          <>
            <CreatePost />
            <PostFeed />
          </>
        )}
        {activeTab === "explore" && <Explore />}
        {/* Profile handled separately on /profile route */}
      </main>
    </div>
  );
}
