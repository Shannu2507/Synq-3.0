"use client";

import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostFeed from "./components/PostFeed";
import Explore from "./components/Explore";
import ProfilePage from "./components/ProfilePage";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";
import { useEffect, useState as useReactState } from "react";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  // Optional: If you want to initialize supabase client here globally (useful for context in future)
  const [supabase] = useReactState(() =>
    createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 flex flex-col items-center p-4 gap-4 overflow-y-auto">
        {activePage === "home" && (
          <>
            <CreatePost />
            <PostFeed />
          </>
        )}
        {activePage === "explore" && <Explore />}
        {activePage === "profile" && <ProfilePage />}
      </main>
    </div>
  );
}
