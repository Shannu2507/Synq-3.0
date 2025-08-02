// src/app/App.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Sidebar from "./components/Sidebar";
import PostFeed from "./components/PostFeed";
import CreatePost from "./components/CreatePost";
import ProfilePage from "./components/ProfilePage";
import ExplorePage from "./components/ExplorePage";
import UserSync from "./components/UserSync";

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-6">Welcome to Synq</h1>
        <button
          onClick={handleGoogleSignIn}
          className="bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar setCurrentPage={setCurrentPage} />
      <main className="flex-1 p-4">
        <UserSync />
        {currentPage === "home" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Synq</h1>
            <CreatePost />
            <PostFeed />
          </>
        )}
        {currentPage === "profile" && <ProfilePage />}
        {currentPage === "explore" && <ExplorePage />}
      </main>
    </div>
  );
}
