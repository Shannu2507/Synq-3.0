"use client";

type SidebarProps = {
  user: any;
  onLogout: () => Promise<void>;
};

export default function Sidebar({ user, onLogout }: SidebarProps) {
  return (
    <div className="p-4 border-r border-white/20 min-h-screen">
      <h2 className="text-white mb-4">User</h2>
      {user ? (
        <div className="space-y-2">
          <p className="text-sm text-white">Signed in as: {user.email}</p>
          <button
            onClick={onLogout}
            className="text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-white">Not signed in</p>
      )}
    </div>
  );
}
