"use client";

import ProfileInfo from "@/app/components/ProfileInfo";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <ProfileInfo />
    </div>
  );
}
