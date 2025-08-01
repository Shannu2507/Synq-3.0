"use client";

import Link from "next/link";

export default function Sidebar({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <div className="h-full bg-zinc-950 p-4 space-y-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Synq</h1>

      <nav className="flex flex-col space-y-4">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <Link href="/explore" className="hover:text-gray-300">Explore</Link>
        <Link href="/profile" className="hover:text-gray-300">Profile</Link>
      </nav>

      <button
        onClick={onLogout}
        className="mt-6 text-red-400 hover:text-red-500 text-sm"
      >
        Logout
      </button>
    </div>
  );
}
