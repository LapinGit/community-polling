import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Button } from "flowbite-react";
import { useSelector } from "react-redux";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const handleCreatePollClick = () => {
    if (!currentUser) {
      console.log("User is not signed in");
    } else {
      console.log("User is signed in, proceed with creating a poll");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto  w-full h-[calc(62vh-100px)] ">
        <h1 className="text-3xl font-bold lg:text-6xl ">
          <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg text-white">
            Community
          </span>
          Polling
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Empowering community voices through inclusive polling – where every
          opinion matters
        </p>

        <Link
          to="/polls"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
          onClick={handleCreatePollClick}
        >
          View all polls
        </Link>
        <div className=" flex   justify-center">
          {currentUser && (
            <Link to={"/create-poll"}>
              <Button
                type="button"
                gradientDuoTone="purpleToPink"
                className="w-96"
                onClick={handleCreatePollClick}
              >
                Create a poll
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-fit mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="gap-4  grid lg:grid-cols-3 max-md:grid-cols-1">
              {posts.slice(0, 6).map(
                (
                  post 
                ) => (
                  <PostCard key={post._id} post={post} />
                )
              )}
            </div>
            <Link
              to={"/polls"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all polls
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
