"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function UserSync() {
  useEffect(() => {
    const syncUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single()

      if (!data && !error) {
        await supabase.from("users").insert({
          id: user.id,
          email: user.email,
          avatar_url: user.user_metadata?.avatar_url || "",
          username: user.user_metadata?.name || "anonymous",
        })
      }
    }

    syncUser()
  }, [])

  return null
}
