'use client'

import { useEffect, useState } from 'react'
import CreatePost from './components/CreatePost'
import PostFeed from './components/PostFeed'
import ProfilePage from './components/ProfilePage'
import ExplorePage from './components/ExplorePage'

export default function App() {
  const [page, setPage] = useState<'home' | 'profile' | 'explore'>('home')

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <nav className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-center space-x-6 text-sm">
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('explore')}>Explore</button>
        <button onClick={() => setPage('profile')}>Profile</button>
      </nav>

      {page === 'home' && (
        <>
          <CreatePost />
          <PostFeed />
        </>
      )}
      {page === 'explore' && <ExplorePage />}
      {page === 'profile' && <ProfilePage />}
    </main>
  )
}
