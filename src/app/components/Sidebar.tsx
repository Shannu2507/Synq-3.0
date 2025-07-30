'use client';

import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

interface SidebarProps {
  user: User | null;
  onLogout: () => void;
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-4 text-white">
      <h1 className="text-2xl font-bold">Synq</h1>

      {user ? (
        <div className="space-y-2">
          <img
            src={user.user_metadata.avatar_url}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <p className="text-sm">{user.user_metadata.name}</p>
          <button
            className="bg-gray-800 px-3 py-1 rounded"
            onClick={() => router.push('/profile')}
          >
            Edit Profile
          </button>
          <button
            className="bg-red-600 px-3 py-1 rounded"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-400">Not signed in</p>
      )}
    </div>
  );
}
