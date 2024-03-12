import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import VoteSection from "../components/VoteSection";

export default function PostPoll() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen  ">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl ">
        {post && post.title}
      </h1>
      <span className="flex justify-center text-gray-500 mb-4">
        {post && new Date(post.createdAt).toLocaleDateString()}
      </span>

      {/* A OR B  */}
      <div className="grid grid-cols-2 px-12 pb-6   max-w-screen-xl		">
        <div className="flex justify-center text-3xl   ">A</div>
        <div className="flex justify-center text-3xl">B</div>
      </div>

      <div className="grid justify-center  ">
        <div className="grid grid-cols-2 gap-12 max-w-4xl ">
          {/* FIRST ROW */}
          <div className="rounded-lg overflow-hidden  ">
            <img
              src={post && post.image}
              alt={post && post.title}
              className="w-full object-fit h-96"
            />
          </div>
          <div className="rounded-lg overflow-hidden ">
            <img
              src={post && post.imageTwo}
              alt={post && post.title}
              className="w-full object-fit h-96"
            />
          </div>
          {/* SECOND ROW */}
          <div className="rounded-lg overflow-hidden">
            {post && (
              <div
                className="post-content p-4"
                dangerouslySetInnerHTML={{ __html: post.contentTwo }}
              />
            )}
          </div>
          <div className="rounded-lg overflow-hidden">
            {post && (
              <div
                className="post-content p-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
          </div>
        </div>
      </div>
      <VoteSection postId={post?._id} />
      <CommentSection postId={post?._id} />
    </main>
  );
}
