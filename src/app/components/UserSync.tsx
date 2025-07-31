"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface UserSyncProps {
  user?: any;
}

export default function UserSync({ user }: UserSyncProps) {
  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        await supabase
          .from("users")
          .upsert(
            { id: user.id, email: user.email },
            { onConflict: "id" }
          );
      }
    };

    syncUser();
  }, [user]);

  return null;
}
