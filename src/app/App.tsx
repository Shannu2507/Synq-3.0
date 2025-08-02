"use client"

import TopNav from "./components/TopNav"
import BottomNav from "./components/BottomNav"
import FloatingPostButton from "./components/FloatingPostButton"
import PostFeed from "./components/PostFeed"
import UserSync from "./components/UserSync"

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <TopNav />
      <UserSync />

      <main className="flex-1 pb-24 px-4 pt-4 space-y-4">
        {/* Future: Stories and trending hashtags can go above */}
        <PostFeed />
      </main>

      <FloatingPostButton />
      <BottomNav />
    </div>
  )
}
