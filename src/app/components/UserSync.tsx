'use client'

import { useEffect } from 'react'
import supabase from '../../lib/supabaseClient'

export default function UserSync() {
  useEffect(() => {
    const syncUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) return

      const { id, user_metadata } = session.user

      await supabase.from('users').upsert({
        id,
        username: user_metadata.full_name || 'anonymous',
      })
    }

    syncUser()
  }, [])

  return null
}
