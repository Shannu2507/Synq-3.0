"use client";

import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostFeed from "./components/PostFeed";
import ProfilePage from "./components/ProfilePage";
import Explore from "./components/Explore";
import BottomNav from "./components/BottomNav";
import TopNav from "./components/TopNav";
import supabase from "@/lib/supabaseClient";
import UserSync from "./components/UserSync";
import AuthButton from "./components/AuthButton";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [page, setPage] = useState("home");

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <AuthButton />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar onNavigate={setPage} currentPage={page} />
      <div className="flex-1 flex flex-col relative">
        <TopNav />
        <UserSync session={session} />
        <div className="flex-1 overflow-y-auto p-4">
          {page === "home" && (
            <>
              <CreatePost />
              <PostFeed />
            </>
          )}
          {page === "explore" && <Explore />}
          {page === "profile" && <ProfilePage session={session} />}
        </div>
        <BottomNav onNavigate={setPage} currentPage={page} />
      </div>
    </main>
  );
}
