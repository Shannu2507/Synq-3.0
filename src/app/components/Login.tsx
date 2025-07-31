'use client'

import { supabase } from '@/lib/supabaseClient'

export default function Login() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
    >
      Sign in with Google
    </button>
  )
}
