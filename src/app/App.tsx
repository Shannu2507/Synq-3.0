"use client"

import PostFeed from "./components/PostFeed"
import Sidebar from "./components/Sidebar"
import CreatePost from "./components/CreatePost"
import ThemeProvider from "../components/ThemeProvider" // ✅ Updated path

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <CreatePost />
          <PostFeed />
        </div>
      </div>
    </ThemeProvider>
  )
}
