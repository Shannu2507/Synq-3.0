"use client";

import AuthButton from "./AuthButton";

export default function Sidebar() {
  return (
    <div className="space-y-6 p-4 text-white">
      <h1 className="text-3xl font-bold text-white">Synq</h1>
      
      <nav className="flex flex-col space-y-2">
        <a href="#" className="hover:text-blue-400">Home</a>
        <a href="#" className="hover:text-blue-400">Explore</a>
        <a href="#" className="hover:text-blue-400">Profile</a>
      </nav>

      <div className="mt-4">
        <AuthButton />
      </div>
    </div>
  );
}
