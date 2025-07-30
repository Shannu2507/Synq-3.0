'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { supabase } from '../../lib/supabaseClient'

export default function Sidebar() {
  const [user, setUser] = useState(null)

  async function getUser() {
    const { data, error } = await supabase.auth.getUser()
    if (!error) setUser(data?.user)
  }

  return (
    <div className="w-64 h-full bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold">Sidebar</h1>
    </div>
  )
}
