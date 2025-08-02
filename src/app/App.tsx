"use client"

import TopNav from "./components/TopNav"
import BottomNav from "./components/BottomNav"
import FloatingPostButton from "./components/FloatingPostButton"
import PostFeed from "./components/PostFeed"

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <TopNav />

      <main className="flex-1 pb-24 px-4 pt-4 space-y-4">
        {/* Future: Stories + Trending will go here */}
        <PostFeed />
      </main>

      <FloatingPostButton />
      <BottomNav />
    </div>
  )
}
