import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";

export default function Polls() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-full p-3 flex py-7 ">
      {posts && posts.length > 0 && (
        <div className="flex flex-col gap-6 mx-auto">
          <h2 className="text-2xl font-semibold text-center">All the Polls</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {posts.map((post) => (
              <div key={post._id} className="mb-4">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
