import LikeButton from './LikeButton' // or '../components/LikeButton' depending on location

...

{posts.map((post) => (
  <div key={post.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
    <div className="text-sm text-zinc-400">
      @{post.username} • {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
    </div>
    <p className="text-lg mt-2">{post.content}</p>

    <LikeButton postId={post.id} userId={userId} />

    {userId === post.user_id && (
      <button onClick={() => handleDelete(post.id)} className="mt-3 text-red-500 text-sm hover:underline">
        Delete Post
      </button>
    )}
  </div>
))}
