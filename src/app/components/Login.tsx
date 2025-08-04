'use client'

import supabase from '@/lib/supabaseClient'

export default function Login() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
    >
      Sign in with Google
    </button>
  )
}
