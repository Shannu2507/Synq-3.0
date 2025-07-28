"use client"

import { ThemeProvider } from "./components/ThemeProvider"
import Sidebar from "./components/Sidebar"
import CreatePost from "./components/CreatePost"
import PostFeed from "./components/PostFeed"

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <div className="w-64 border-r border-zinc-200 dark:border-zinc-800 p-4">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 space-y-6">
          <CreatePost />
          <PostFeed />
        </main>
      </div>
    </ThemeProvider>
  )
}
