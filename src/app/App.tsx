"use client";

import Sidebar from "./components/Sidebar";
import PostFeed from "./components/PostFeed";
import ProfilePage from "./components/ProfilePage";

export default function App() {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 p-4 bg-white shadow">
        <Sidebar />
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-6">
          ✅ Synq is alive inside App.tsx
        </h1>

        {/* Render actual PostFeed and ProfilePage */}
        <div className="mb-8">
          <PostFeed />
        </div>

        <div>
          <ProfilePage />
        </div>
      </div>
    </div>
  );
}
