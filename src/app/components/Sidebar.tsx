"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  user: User | null;
  onLogout: () => void;
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  return (
    <div className="flex flex-col items-start space-y-4">
      <h2 className="text-xl font-bold mb-4">Synq</h2>

      {user ? (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <img
              src={user.user_metadata?.avatar_url}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span>{user.user_metadata?.name || user.email}</span>
          </div>
          <Button variant="destructive" onClick={onLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <span className="text-sm text-gray-400">Not signed in</span>
      )}
    </div>
  );
}
