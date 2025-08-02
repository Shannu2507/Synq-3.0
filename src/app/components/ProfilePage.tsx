// src/app/components/ProfilePage.tsx
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type Props = {
  session: any
}

export default function ProfilePage({ session }: Props) {
  const [username, setUsername] = useState("")
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [editingUsername, setEditingUsername] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data } = await supabase.from("users").select("*").eq("id", session.user.id).single()
    if (data) {
      setUsername(data.username || "")
      setProfilePicture(data.profile_picture || null)
    }
  }

  const updateUsername = async () => {
    await supabase.from("users").update({ username }).eq("id", session.user.id)
    setEditingUsername(false)
  }

  const handlePictureUpload = async (file: File) => {
    const fileName = `${session.user.id}-${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage.from("profile-pictures").upload(fileName, file)

    if (!error) {
      const url = supabase.storage.from("profile-pictures").getPublicUrl(fileName).data.publicUrl
      await supabase.from("users").update({ profile_picture: url }).eq("id", session.user.id)
      setProfilePicture(url)
    }
  }

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow max-w-md">
      <div className="flex flex-col items-center space-y-4">
        {profilePicture && (
          <img
            src={profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-700"
          />
        )}
        <input
          type="file"
          onChange={(e) => e.target.files && handlePictureUpload(e.target.files[0])}
          className="text-sm text-gray-400"
        />
        <div className="text-xl font-semibold text-white">
          {editingUsername ? (
            <div className="flex space-x-2">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#111] text-white px-2 py-1 rounded outline-none"
              />
              <button onClick={updateUsername} className="text-green-400">Save</button>
            </div>
          ) : (
            <span onClick={() => setEditingUsername(true)} className="cursor-pointer hover:underline">
              {username || "Anonymous"}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

