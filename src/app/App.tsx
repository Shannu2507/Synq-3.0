"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import CreatePost from "./components/CreatePost";
import PostFeed from "./components/PostFeed";
import Sidebar from "./components/Sidebar";
import ProfilePage from "./components/ProfilePage";
import UserSync from "./components/UserSync";
import { usePathname, useRouter } from "next/navigation";
import ExplorePage from "./components/ExplorePage";
import LoginPage from "./components/LoginPage";

export default function App() {
  const [session, setSession] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!session && pathname !== "/login") {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white">
      {session && <UserSync session={session} />}
      {session && <Sidebar />}
      <main className="ml-20 p-4">
        {pathname === "/" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Synq</h1>
            <CreatePost user={session.user} />
            <PostFeed />
          </>
        )}
        {pathname === "/profile" && <ProfilePage session={session} />}
        {pathname === "/explore" && <ExplorePage />}
        {pathname === "/login" && <LoginPage />}
      </main>
    </div>
  );
}
