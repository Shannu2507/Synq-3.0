"use client";

import React from "react";
import Image from "next/image";

interface SidebarProps {
  user: any;
  onLogout: () => Promise<void>;
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {user?.user_metadata?.avatar_url && (
          <Image
            src={user.user_metadata.avatar_url}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div>
          <div className="text-sm">{user?.user_metadata?.full_name || "User"}</div>
          <button onClick={onLogout} className="text-xs text-red-400 hover:underline">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
