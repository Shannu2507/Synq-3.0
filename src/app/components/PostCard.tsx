import { Heart, MessageCircle } from 'lucide-react'

export default function PostCard() {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex gap-4">
        <Heart className="cursor-pointer" />
        <MessageCircle className="cursor-pointer" />
      </div>
    </div>
  )
}
