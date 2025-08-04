"use client"

import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"

export default function ProfileInfo({ user }: { user: any }) {
  const [username, setUsername] = useState("")

  useEffect(() => {
    const fetchUsername = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("username")
        .eq("id", user.id)
        .single()

      if (data && !error) {
        setUsername(data.username)
      }
    }

    if (user) {
      fetchUsername()
    }
  }, [user])

  return (
    <div className="text-white">
      <h2 className="text-xl font-semibold">Welcome, {username || "User"}!</h2>
    </div>
  )
}
