export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around items-center h-16 z-10">
      <button className="text-white">🏠</button>
      <button className="text-white">🔍</button>
      <div className="w-12" /> {/* Space for floating post button */}
      <button className="text-white">💬</button>
      <button className="text-white">👤</button>
    </nav>
  )
}
