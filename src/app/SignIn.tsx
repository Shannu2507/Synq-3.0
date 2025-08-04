"use client"

import createClient from "@/lib/supabaseClient"

export default function SignIn() {
  const supabase = createClient 

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <button
        onClick={handleSignIn}
        className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
      >
        Sign in with Google
      </button>
    </div>
  )
}
