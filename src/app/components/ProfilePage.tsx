// src/app/components/ProfilePage.tsx
"use client"

import { Session } from "@supabase/supabase-js"

type Props = {
  session: Session
}

export default function ProfilePage({ session }: Props) {
  return (
    <div className="w-full max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Welcome, {session.user.email}</h2>
      {/* Add more profile details or editable fields */}
    </div>
  )
}
