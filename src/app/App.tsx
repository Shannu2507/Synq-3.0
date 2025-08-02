"use client";

import CreatePost from "./components/CreatePost";
import PostFeed from "./components/PostFeed";
import UserSync from "./components/UserSync";
import ProfilePage from "./components/ProfilePage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <UserSync />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Synq</h1>
        <CreatePost />
        <PostFeed />
        <ProfilePage />
      </div>
    </div>
  );
}
