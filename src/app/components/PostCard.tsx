'use client';

interface PostCardProps {
  name: string;
  caption: string;
  image_url?: string;
}

export default function PostCard({ name, caption, image_url }: PostCardProps) {
  return (
    <div className="bg-[#111] text-white rounded-lg shadow-md p-4 mb-4">
      <p className="text-sm text-gray-400 mb-1 font-semibold">{name || 'Anonymous'}</p>
      <p className="text-base">{caption}</p>
      {image_url && (
        <img
          src={image_url}
          alt="Post"
          className="mt-2 rounded-md max-h-80 object-cover w-full"
        />
      )}
      <div className="flex justify-between mt-4 text-sm text-gray-400">
        <button className="hover:text-red-400">❤️ 0</button>
        <button className="hover:text-blue-400">💬 Comment</button>
      </div>
    </div>
  );
}
