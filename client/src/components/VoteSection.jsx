import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Vote from "./Vote";

export default function VoteSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [vote, setVote] = useState(0);
  const [votes, setVotes] = useState([]);
  const navigate = useNavigate();
  const [hasVoted, setHasVoted] = useState(false); 
  
  useEffect(() => {
    // Check if the user has already voted from local storage
    const hasVotedPreviously = localStorage.getItem(`hasVoted_${postId}`);
    if (hasVotedPreviously) {
      setHasVoted(true); // Set hasVoted to true if the user has already voted
    }

    const getVotes = async () => {
      try {
        const res = await fetch(`/api/vote/getPostVotes/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setVotes(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getVotes();
  }, [postId]);

  useEffect(() => {
    // Automatically submit vote when the component mounts
    if (!hasVoted && currentUser) {
      handleSubmitVote();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasVoted, currentUser]);

  const handleSubmitVote = async () => {
    // Check if the user has already voted from local storage
    const hasVotedPreviously = localStorage.getItem(`hasVoted_${postId}`);
    if (hasVotedPreviously) {
      return; // If the user has already voted, do nothing
    }
  
    // Proceed with the voting process
    try {
      const res = await fetch("/api/vote/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: vote,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setVote("");
        setVotes([data, ...votes]);
        setHasVoted(true);
  
        // Store in local storage that the user has voted for this postId
        localStorage.setItem(`hasVoted_${postId}`, true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleVoteA = async (voteId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/vote/voteA/${voteId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setVotes(
          votes.map((vote) =>
            vote._id === voteId
              ? {
                  ...vote,
                  likes: data.likes,
                  aVote: data.likes.length,
                }
              : vote
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleVoteB = async (voteId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/vote/voteB/${voteId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setVotes(
          votes.map((vote) =>
            vote._id === voteId
              ? {
                  ...vote,
                  likes: data.likes,
                  bVote: data.likes.length,
                }
              : vote
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Calculate total likes
  const totalVotes = votes.reduce((total, vote) => total + vote.likes.length, 0);

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to vote.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {!hasVoted && currentUser && ( 
        <div className="flex justify-between items-center mt-5">
          <Button
            outline
            gradientDuoTone="purpleToBlue"
            onChange={(e) => setVote(e.target.value)}
            value={vote}
            onClick={handleSubmitVote}
          >
            Submit
          </Button>
        </div>
      )}
      <div className="text-sm my-5 flex items-center gap-1 ">
        <p>Total Votes</p>
        <div className="border border-gray-400 py-1 px-2 rounded-sm">
          <p>{totalVotes}</p>
        </div>
      </div>
      {votes.map((vote) => (
        <Vote key={vote._id} vote={vote} handleVoteA={handleVoteA} handleVoteB={handleVoteB} />
      ))}
    </div>
  );
}
