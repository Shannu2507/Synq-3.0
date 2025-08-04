'use client'

import React from 'react'

type SidebarProps = {
  onNavigate: (page: string) => void
  currentPage: string
}

export default function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-900 p-4 text-white">
      <nav className="flex flex-col gap-4">
        <button
          className={`text-left ${currentPage === 'home' ? 'font-bold' : ''}`}
          onClick={() => onNavigate('home')}
        >
          Home
        </button>
        <button
          className={`text-left ${currentPage === 'explore' ? 'font-bold' : ''}`}
          onClick={() => onNavigate('explore')}
        >
          Explore
        </button>
        <button
          className={`text-left ${currentPage === 'profile' ? 'font-bold' : ''}`}
          onClick={() => onNavigate('profile')}
        >
          Profile
        </button>
      </nav>
    </aside>
  )
}
