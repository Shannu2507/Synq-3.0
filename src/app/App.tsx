'use client';

import Sidebar from './components/Sidebar';
import PostFeed from './components/PostFeed';
import CreatePost from './components/CreatePost';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="w-1/4 p-4">
        <Sidebar />
      </div>
      <div className="w-3/4 p-4 space-y-4">
        <CreatePost />
        <PostFeed />
      </div>
    </div>
  );
}
