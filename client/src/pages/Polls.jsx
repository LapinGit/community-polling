import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";

export default function Polls() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts(data.posts);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-full p-3 flex py-7 ">
      <div className="flex flex-col gap-6 mx-auto">
        <h2 className="text-2xl font-semibold text-center">All the Polls</h2>
        {currentUser ? (
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {userPosts.map((post) => (
                <div key={post._id} className="mb-4">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
            <div>
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className="w-full text-teal-500 self-center text-sm py-7"
                >
                  Show more
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">You must be signed in to see all the posts.</p>
        )}
      </div>
    </div>
  );
}
