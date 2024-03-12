import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Vote({ vote, handleVoteA, handleVoteB }) {
  const [, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${vote.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [vote]);

  const hasVoted = currentUser && vote.likes.includes(currentUser._id);

  const handleVoteAClick = async () => {
    await handleVoteA(vote._id);
    window.location.reload();
  };

  const handleVoteBClick = async () => {
    await handleVoteB(vote._id);
    window.location.reload();
  };

  return (
    <div className="flex justify-evenly text-sm  ">
      <div className="flex gap-12">
        <>
          {/* VOTE A */}
          <div className="flex flex-col pt-2 text-xs gap-2 ">
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              type="button"
              onClick={handleVoteAClick}
              className={`text-gray-400 hover:text-blue-500 ${
                hasVoted ? "!text-blue-500" : ""
              }`}
              disabled={hasVoted}
            >
              Vote A
            </Button>
            <p className="text-black-500 font-extrabold text-xl ">
              {vote.aVote > 0 &&
                vote.aVote +
                  " " +
                  (vote.aVote === 1 ? "Vote For A" : "Votes For A")}
            </p>
          </div>
          {/* VOTE B  */}
          <div className="flex  flex-col  pt-2 text-xs gap-2">
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              type="button"
              onClick={handleVoteBClick}
              className={`text-gray-400 hover:text-blue-500 ${
                hasVoted ? "!text-blue-500" : ""
              }`}
              disabled={hasVoted}
            >
              Vote B
            </Button>
            <p className="text-black-500 font-extrabold text-xl">
              {vote.bVote > 0 &&
                vote.bVote +
                  " " +
                  (vote.bVote === 1 ? "Vote For B" : "Votes For B")}
            </p>
          </div>
        </>
      </div>
    </div>
  );
}
