"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";

export default function UserSync() {
  const user = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        await supabase
          .from("users")
          .upsert({ id: user.id, email: user.email }, { onConflict: "id" });
      }
    };
    syncUser();
  }, [user]);

  return null;
}
