"use client";

import PostFeed from "./components/PostFeed";
import ProfilePage from "./components/ProfilePage";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4 flex-1 bg-gray-50 min-h-screen">
        <PostFeed />
        <div className="mt-6">
          <ProfilePage />
        </div>
      </main>
    </div>
  );
}

