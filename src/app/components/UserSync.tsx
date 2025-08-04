'use client'

import { Session } from '@supabase/supabase-js'
import { useEffect } from 'react'
import supabase from '@/lib/supabaseClient'

type Props = {
  session: Session
}

export default function UserSync({ session }: Props) {
  useEffect(() => {
    if (!session) return

    const syncUser = async () => {
      const user = session.user
      const { error } = await supabase
        .from('users')
        .upsert({ id: user.id, email: user.email })

      if (error) {
        console.error('Error syncing user:', error.message)
      }
    }

    syncUser()
  }, [session])

  return null
}
