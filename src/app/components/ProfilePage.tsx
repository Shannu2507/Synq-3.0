'use client'

import { Session } from '@supabase/supabase-js'

type Props = {
  session: Session | null
}

export default function ProfilePage({ session }: Props) {
  return (
    <div className="text-white p-4">
      <h1 className="text-xl font-bold mb-4">Profile Page</h1>

      {session ? (
        <div>
          <p>Email: {session.user.email}</p>
          <p>User ID: {session.user.id}</p>
          {/* Add more profile info here if needed */}
        </div>
      ) : (
        <p className="text-gray-400">You are not logged in.</p>
      )}
    </div>
  )
}
