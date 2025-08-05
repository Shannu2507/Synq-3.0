'use client';

import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import supabase from '../../lib/supabaseClient';

type Props = {
  session: Session | null;
};

export default function ProfilePage({ session }: Props) {
  const [username, setUsername] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (!session) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('username, profile_picture')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
      } else if (data) {
        setUsername(data.username || '');
        setProfilePictureUrl(data.profile_picture || '');
      }
    };

    const fetchUserPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user posts:', error);
      } else {
        setPosts(data || []);
      }
    };

    fetchProfile();
    fetchUserPosts();
  }, [session]);

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !session) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${session.user.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Upload failed:', uploadError);
      return;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // Update user record with new URL
    const { error: updateError } = await supabase
      .from('users')
      .update({ profile_picture: publicUrl })
      .eq('id', session.user.id);

    if (updateError) {
      console.error('Error updating profile picture URL:', updateError);
    } else {
      setProfilePictureUrl(publicUrl); // Update UI
    }
  };

  if (!session) {
    return <p className="text-gray-400">You are not logged in.</p>;
  }

  return (
    <div className="text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {/* Profile Info */}
      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="profilePicUpload" className="cursor-pointer">
          {profilePictureUrl ? (
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full border border-zinc-700 object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-zinc-700 flex items-center justify-center text-sm text-zinc-400">
              No Image
            </div>
          )}
        </label>
        <input
          id="profilePicUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfilePictureUpload}
        />

        <div>
          <p className="text-lg font-semibold">{username || 'Anonymous'}</p>
          <p className="text-sm text-zinc-400">{session.user.email}</p>
        </div>
      </div>

      {/* Posts by user */}
      <div>
        <h2 className="text-lg font-bold mb-2">Your Posts</h2>
        {posts.length === 0 ? (
          <p className="text-zinc-400">You haven’t posted anything yet.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-zinc-900 p-4 rounded-xl border border-zinc-700"
              >
                <p className="text-sm text-zinc-400">
                  {new Date(post.created_at).toLocaleString()}
                </p>
                <p className="text-lg mt-1">{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
