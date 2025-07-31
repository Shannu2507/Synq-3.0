"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function UserSync({ user }: { user: any }) {
  const router = useRouter()

  useEffect(() => {
    const syncUser = async () => {
      if (user?.id && user?.email) {
        await supabase
          .from("users")
          .upsert(
            [{ id: user.id, email: user.email }],
            { onConflict: "id" }
          )
      }
    }

    syncUser()
    router.refresh()
  }, [user, router])

  return null
}
