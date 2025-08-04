"use client";

import { createClient } from "@/lib/supabaseClient";

export default function Login() {
  const supabase = createClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Welcome to Synq</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white"
      >
        Sign in with Google
      </button>
    </div>
  );
}
