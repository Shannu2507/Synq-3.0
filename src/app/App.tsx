"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostFeed from "./components/PostFeed";
import ProfilePage from "./components/ProfilePage";
import Explore from "./components/Explore";
import Login from "./components/Login";
import UserSync from "./components/UserSync";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [page, setPage] = useState("home");
  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  if (!session) {
    return <Login />;
  }

  return (
    <main className="flex h-screen w-screen bg-[#0d0d0d] text-white">
      <Sidebar setPage={setPage} page={page} />
      <div className="flex flex-col flex-1 overflow-y-auto p-4">
        <UserSync session={session} />
        {page === "home" && (
          <>
            <CreatePost session={session} />
            <PostFeed session={session} />
          </>
        )}
        {page === "explore" && <Explore session={session} />}
        {page === "profile" && <ProfilePage session={session} />}
      </div>
    </main>
  );
}
