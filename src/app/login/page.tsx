'use client'

import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
        Sign in with Google
      </button>
    </div>
  )
}
