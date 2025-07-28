interface PostCardProps {
  name?: string
  caption: string
  image_url?: string
}

export default function PostCard({ name = "Anonymous", caption, image_url }: PostCardProps) {
  return (
    <div className="rounded-2xl p-4 bg-gradient-to-br from-white via-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-800 shadow-md transition-all">
      <div className="font-semibold text-zinc-800 dark:text-zinc-100 mb-1">{name}</div>
      <p className="text-zinc-600 dark:text-zinc-300 mb-2">{caption}</p>
      {image_url && (
        <img
          src={image_url}
          alt="Post"
          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700"
        />
      )}
    </div>
  )
}
