"use client";

import { useEffect } from "react";
import supabase from "@/lib/supabaseClient";

export default function UserSync() {
  useEffect(() => {
    const syncUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const user = session.user;

      const { data: existing, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!existing && !error) {
        await supabase.from("profiles").insert({
          id: user.id,
          username: user.user_metadata.full_name || user.email,
          profile_picture: user.user_metadata.avatar_url || "",
        });
      }
    };

    syncUser();
  }, []);

  return null;
}
