// src/app/components/UserSync.tsx
"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

type Props = {
  session: any
}

export default function UserSync({ session }: Props) {
  useEffect(() => {
    const syncUser = async () => {
      const { data: existing } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single()

      if (!existing) {
        await supabase.from("users").insert({
          id: session.user.id,
          email: session.user.email,
          username: session.user.user_metadata?.full_name || "Anonymous",
        })
      }
    }

    if (session?.user) {
      syncUser()
    }
  }, [session])

  return null
}
