"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ProfileInfo({ user }: { user: any }) {
  const [username, setUsername] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      const { data } = await supabase
        .from("users")
        .select("username")
        .eq("id", user.id)
        .single();

      if (data) setUsername(data.username || "");
      setLoading(false);
    };

    fetchUsername();
  }, [user]);

  const updateUsername = async () => {
    await supabase
      .from("users")
      .update({ username })
      .eq("id", user.id);

    setEditing(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4 bg-zinc-900 p-6 rounded-md">
      <p className="text-sm text-gray-400">Email: {user.email}</p>

      {editing ? (
        <div className="space-y-2">
          <input
            className="bg-gray-800 px-3 py-1 rounded text-white w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={updateUsername}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Username: {username}</h2>
          <button
            onClick={() => setEditing(true)}
            className="text-blue-400 hover:text-blue-500 text-sm"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
