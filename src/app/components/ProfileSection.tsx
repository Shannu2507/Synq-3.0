"use client"

import { useState } from "react"
import supabase from "@/lib/supabaseClient"

interface ProfileSectionProps {
  user: any
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const [newUsername, setNewUsername] = useState("")

  const updateUsername = async () => {
    if (!newUsername.trim()) return

    const { error } = await supabase
      .from("users")
      .update({ username: newUsername })
      .eq("id", user.id)

    if (!error) {
      alert("Username updated!")
      setNewUsername("")
    } else {
      alert("Error updating username.")
    }
  }

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="New username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        className="bg-zinc-800 text-white px-4 py-2 rounded"
      />
      <button
        onClick={updateUsername}
        className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </div>
  )
}
