"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function SignIn() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) router.push("/")
    }
    checkSession()
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to Synq</h1>
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full text-lg font-semibold"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
