'use client'

import { supabase } from '../../lib/supabaseClient'

export default function LoginPage() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) console.error('Login error:', error.message)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <button
        className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        onClick={handleLogin}
      >
        Sign in with Google
      </button>
    </div>
  )
}
