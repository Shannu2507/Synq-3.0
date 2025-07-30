'use client'

import { Button } from '@/components/ui/button'
import ProfileSection from './ProfileSection'

interface SidebarProps {
  user: any
  onLogout: () => Promise<void>
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Synq</h1>

      {!user ? (
        <Button
          onClick={() => {
            window.location.href = '/login'
          }}
          className="bg-blue-600 text-white"
        >
          Sign in with Google
        </Button>
      ) : (
        <>
          <ProfileSection user={user} />

          <Button
            onClick={onLogout}
            className="bg-red-600 text-white mt-4"
          >
            Logout
          </Button>
        </>
      )}
    </div>
  )
}
