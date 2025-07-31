"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Sidebar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // reloads to show sign-in page
  };

  return (
    <div className="p-4 border-r border-white/20 min-h-screen">
      <h2 className="text-white mb-4">User</h2>
      {user ? (
        <button
          onClick={handleLogout}
          className="text-red-500 hover:underline"
        >
          Logout
        </button>
      ) : (
        <p className="text-white">Not signed in</p>
      )}
    </div>
  );
}
