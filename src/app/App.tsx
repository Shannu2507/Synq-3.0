"use client";

import PostFeed from "./components/PostFeed";
import ProfilePage from "./components/ProfilePage";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4 flex-1 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-green-600">
          ✅ Synq is alive inside App.tsx
        </h1>
        <PostFeed />
        <div className="mt-6">
          <ProfilePage />
        </div>
      </main>
    </div>
  );
}

