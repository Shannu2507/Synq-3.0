"use client"

import { Session } from "@supabase/supabase-js"

interface SidebarProps {
  page: "home" | "profile" | "explore"
  setPage: (page: "home" | "profile" | "explore") => void
  session: Session | null
}

export default function Sidebar({ page, setPage, session }: SidebarProps) {
  return (
    <div className="w-48 bg-zinc-900 p-4 min-h-screen border-r border-zinc-800 hidden sm:block">
      <div className="text-xl font-bold mb-6 text-white">Synq</div>
      {session && (
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setPage("home")}
              className={`w-full text-left px-2 py-1 rounded ${
                page === "home" ? "bg-zinc-800 text-white" : "text-zinc-400"
              }`}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => setPage("explore")}
              className={`w-full text-left px-2 py-1 rounded ${
                page === "explore" ? "bg-zinc-800 text-white" : "text-zinc-400"
              }`}
            >
              Explore
            </button>
          </li>
          <li>
            <button
              onClick={() => setPage("profile")}
              className={`w-full text-left px-2 py-1 rounded ${
                page === "profile" ? "bg-zinc-800 text-white" : "text-zinc-400"
              }`}
            >
              Profile
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
