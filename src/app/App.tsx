"use client"

import CreatePost from "./components/CreatePost"
import PostFeed from "./components/PostFeed"
import ThemeProvider from "../components/ThemeProvider"

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <CreatePost />
        <PostFeed />
      </div>
    </ThemeProvider>
  )
}
