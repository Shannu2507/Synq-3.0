'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useSessionContext } from '@/lib/useSessionContext' // or replace with your actual session method

export default function UserSync() {
  const { session } = useSessionContext()

  useEffect(() => {
    const syncUser = async () => {
      const user = session?.user
      if (!user) return

      await supabase.from('users').upsert(
        [{ id: user.id, email: user.email }],
        { onConflict: 'id' }
      )
    }

    syncUser()
  }, [session])

  return null
}
