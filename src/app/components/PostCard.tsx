"use client";

import { supabase } from "../../lib/supabaseClient";

export default function PostCard({ post }: { post: any }) {
  return (
    <div className="p-4 border rounded mb-4">
      <p>{post.caption}</p>
    </div>
  );
}
