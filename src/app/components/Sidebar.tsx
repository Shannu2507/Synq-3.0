"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import defaultAvatar from "@/public/default-avatar.png"; // optional, or remove

interface SidebarProps {
  user: User;
  onLogout: () => void;
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-zinc-900 p-4 rounded-lg h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-4 mb-6">
          <Image
            src={user?.user_metadata?.avatar_url || defaultAvatar}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span>{user?.user_metadata?.name || "User"}</span>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white mb-4"
        >
          {menuOpen ? "Close Menu" : "Open Menu"}
        </button>
        {menuOpen && (
          <ul className="text-white space-y-2">
            <li>Feed</li>
            <li>My Profile</li>
            <li>Settings</li>
          </ul>
        )}
      </div>
      <button
        onClick={onLogout}
        className="bg-red-600 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}
