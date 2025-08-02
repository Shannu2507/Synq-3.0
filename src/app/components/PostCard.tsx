"use client"

type Props = {
  id: string
  userId: string
  username: string
  content: string
  imageUrl: string | null
  likes: number
}

export default function PostCard({ id, userId, username, content, imageUrl, likes }: Props) {
  return (
    <div className="bg-white/5 p-4 rounded-xl shadow-sm space-y-2">
      <div className="flex justify-between text-sm text-white/80 font-semibold">
        <span>@{username}</span>
        {/* TODO: Re-enable when session logic is wired in */}
        {/* <button onClick={deletePost} className="text-red-400 hover:underline">Delete</button> */}
      </div>
      <p className="text-white">{content}</p>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="post"
          className="w-full rounded-lg border border-white/10 mt-2"
        />
      )}
      <div className="flex justify-start gap-4 pt-2 text-sm text-white/70">
        <span>❤️ {likes}</span>
        <span>💬 0</span>
        <span>🔁</span>
      </div>
    </div>
  )
}
