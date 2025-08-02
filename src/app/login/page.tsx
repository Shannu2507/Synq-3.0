// src/app/login/page.tsx
"use client"

import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <button
        onClick={handleSignIn}
        className="bg-white text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-200 transition"
      >
        Sign in with Google
      </button>
    </div>
  )
}
