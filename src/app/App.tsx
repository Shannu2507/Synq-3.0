import Sidebar from "./components/Sidebar"
import PostFeed from "./components/PostFeed"
import ProfilePage from "./components/ProfilePage"
import CreatePost from "./components/CreatePost"

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <CreatePost />
        <PostFeed />
      </div>
    </div>
  )
}

export default App
