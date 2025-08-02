"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };

    getUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">Profile</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
