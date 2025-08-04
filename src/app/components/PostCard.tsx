'use client'

export type Post = {
  id: string
  content: string
  created_at: string
  user_id: string
}

type Props = {
  post: Post
}

export default function PostCard({ post }: Props) {
  return (
    <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl shadow">
      <p className="text-sm text-neutral-800 dark:text-neutral-200">
        {post.content}
      </p>
      <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
        Posted on: {new Date(post.created_at).toLocaleString()}
      </p>
    </div>
  )
}
