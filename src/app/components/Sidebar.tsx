"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SidebarProps {
  user: any;
  onLogout: () => Promise<void>;
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  return (
    <div className="space-y-6 p-4 text-white">
      <h1 className="text-3xl font-bold text-white">Synq</h1>

      <nav className="flex flex-col space-y-2">
        <a href="#" className="hover:text-blue-400">Home</a>
        <a href="#" className="hover:text-blue-400">Explore</a>
        <a href="#" className="hover:text-blue-400">Profile</a>
      </nav>

      <div className="mt-4">
        {!user ? (
          <a
            href="https://pyvqjtatbyqxnsmhgixw.supabase.co/auth/v1/authorize?provider=google"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign in with Google
          </a>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {user.avatar_url && (
                <Image
                  src={user.avatar_url}
                  alt="Profile"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}
              <span className="text-sm">
                {user.username || user.email || "Signed in"}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
