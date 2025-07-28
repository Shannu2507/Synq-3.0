"use client"

import { useEffect, useState } from "react"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      document.documentElement.classList.add("dark")
      setTheme("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-all">
      <div className="flex justify-end p-4">
        <button
          onClick={toggleTheme}
          className="text-sm px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Toggle {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
      {children}
    </div>
  )
}
