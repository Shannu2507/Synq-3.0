"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [initialUsername, setInitialUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("users")
        .select("username")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setUsername(data.username || "");
        setInitialUsername(data.username || "");
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  const updateUsername = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("users")
      .update({ username })
      .eq("id", user.id);

    if (!error) {
      alert("Username updated!");
      setInitialUsername(username);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Profile</h2>
      <div className="space-y-2">
        <input
          className="p-2 rounded bg-gray-800 text-white border border-gray-600 w-full"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={updateUsername}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          disabled={username === initialUsername}
        >
          Save
        </button>
      </div>
    </div>
  );
}
