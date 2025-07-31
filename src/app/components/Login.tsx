'use client'

import { supabase } from '@/lib/supabaseClient'

export default function Login() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

