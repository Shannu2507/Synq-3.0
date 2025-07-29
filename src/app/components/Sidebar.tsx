export default function Sidebar() {
  return (
    <div className="bg-[#121212] text-white p-4 rounded-lg shadow-md min-h-screen">
      <h2 className="text-xl font-bold mb-4">Synq</h2>
      <ul className="space-y-2">
        <li className="hover:text-blue-400 cursor-pointer">Home</li>
        <li className="hover:text-blue-400 cursor-pointer">Explore</li>
        <li className="hover:text-blue-400 cursor-pointer">Profile</li>
      </ul>
    </div>
  );
}
