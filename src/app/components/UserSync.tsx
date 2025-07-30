'use client'

import { useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function UserSync() {
  useEffect(() => {
    const syncUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase
          .from('users')
          .upsert({ id: user.id, email: user.email }, { onConflict: ['id'] })
      }
    }

    syncUser()
  }, [])

  return null
}
