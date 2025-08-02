"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function UserSync() {
  useEffect(() => {
    const syncUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.from("users").upsert({
        id: user.id,
        email: user.email,
        avatar_url: user.user_metadata?.picture,
        username: user.user_metadata?.name || "anon",
      })

      if (error) console.error("UserSync error:", error)
    }

    syncUser()
  }, [])

  return null
}
