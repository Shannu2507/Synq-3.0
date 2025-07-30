'use client'

import React from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Synq Sidebar</h2>
      {/* Profile info and nav can go here */}
    </aside>
  )
}
