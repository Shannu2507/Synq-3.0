// src/app/components/Sidebar.tsx
"use client"

type Props = {
  setRoute: (route: "home" | "profile" | "explore") => void
  handleLogout: () => void
}

export default function Sidebar({ setRoute, handleLogout }: Props) {
  return (
    <aside className="w-48 bg-[#1a1a1a] h-screen p-4 border-r border-gray-800 flex flex-col space-y-4">
      <h1 className="text-2xl font-bold text-white mb-6">Synq</h1>
      <button onClick={() => setRoute("home")} className="text-left text-white hover:bg-[#333] p-2 rounded">
        Home
      </button>
      <button onClick={() => setRoute("explore")} className="text-left text-white hover:bg-[#333] p-2 rounded">
        Explore
      </button>
      <button onClick={() => setRoute("profile")} className="text-left text-white hover:bg-[#333] p-2 rounded">
        Profile
      </button>
      <button onClick={handleLogout} className="mt-auto text-left text-red-500 hover:bg-[#331111] p-2 rounded">
        Logout
      </button>
    </aside>
  )
}
