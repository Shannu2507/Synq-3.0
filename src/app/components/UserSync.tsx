"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

interface Props {
  session: Session;
}

export default function UserSync({ session }: Props) {
  const supabase = createClient();

  useEffect(() => {
    const syncUser = async () => {
      if (!session?.user) return;

      await supabase.from("users").upsert({
        id: session.user.id,
        email: session.user.email,
      });
    };

    syncUser();
  }, [session, supabase]);

  return null;
}
