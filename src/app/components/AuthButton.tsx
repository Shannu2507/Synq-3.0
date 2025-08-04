"use client"

import supabase from "@/lib/supabaseClient" // ✅ fixed import
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  if (!user) return null

  return (
    <button
      onClick={handleSignOut}
      className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded"
    >
      Sign Out
    </button>
  )
}
