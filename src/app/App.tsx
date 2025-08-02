"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostFeed from "./components/PostFeed";
import ProfilePage from "./components/ProfilePage";
import UserSync from "./components/UserSync";
import ExplorePage from "./explore/page"; //  fixed path

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
        {activeTab === "explore" && <ExplorePage />}
        {activeTab === "profile" && <ProfilePage />}
      </main>
    </div>
  );
}
