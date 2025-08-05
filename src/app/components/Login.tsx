'use client'

import supabase from '../../lib/supabaseClient'

export default function Login() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <button
        onClick={handleLogin}
        className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-zinc-200 transition"
      >
        Sign in with Google
      </button>
    </div>
  )
}
