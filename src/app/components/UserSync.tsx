// src/app/components/UserSync.tsx

'use client'

import { useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import supabase from '../../lib/supabaseClient'

interface UserSyncProps {
  session: Session
}

export default function UserSync({ session }: UserSyncProps) {
  useEffect(() => {
    const syncUser = async () => {
      if (!session?.user) return

      const { user } = session

      await supabase.from('users').upsert({
        id: user.id,
        email: user.email,
        username: user.user_metadata?.name || user.email,
        profile_picture: user.user_metadata?.avatar_url || '',
      })
    }

    syncUser()
  }, [session])

  return null
}
