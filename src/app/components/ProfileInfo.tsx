"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ProfileInfo({ user }: { user: any }) {
  const [username, setUsername] = useState("");
  const [editing, setEditing] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("username, profile_picture")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setUsername(data.username || "");
        setProfilePictureUrl(data.profile_picture || "");
      }
      setLoading(false);
    };

    fetchUser();
  }, [user.id]);

  const updateUsername = async () => {
    const { error } = await supabase
      .from("users")
      .update({ username })
      .eq("id", user.id);

    if (!error) {
      setEditing(false);
      alert("Username updated!");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      const { data: storageData, error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(fileName);

      const publicUrl = urlData?.publicUrl;

      const { error: updateError } = await supabase
        .from("users")
        .update({ profile_picture: publicUrl })
        .eq("id", user.id);

      if (!updateError) {
        setProfilePictureUrl(publicUrl);
        alert("Profile picture updated!");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6 bg-zinc-900 p-6 rounded-md">
      <div className="flex flex-col items-start space-y-3">
        <label className="text-sm text-gray-400">Email: {user.email}</label>

        <div className="w-32 h-32">
          {profilePictureUrl ? (
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-800 border flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="text-sm text-white"
        />
      </div>

      {editing ? (
        <div className="space-y-2">
          <input
            className="bg-gray-800 px-3 py-1 rounded text-white w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={updateUsername}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Username: {username}</h2>
          <button
            onClick={() => setEditing(true)}
            className="text-blue-400 hover:text-blue-500 text-sm"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
