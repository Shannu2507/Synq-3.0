export default function TopNav() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-white/10">
      <button className="text-xl">🔍</button>
      <h1 className="text-xl font-semibold text-cyan-400">Synq</h1>
      <button className="relative">
        🔔
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-cyan-400"></span>
      </button>
    </header>
  )
}
