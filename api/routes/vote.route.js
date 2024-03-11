import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createVote,
  getPostVotes,
  getVotes,
  voteA,
  voteB,
} from "../controllers/vote.contoller.js";

const router = express.Router();
router.post("/create", verifyToken, createVote);
router.get("/getPostVotes/:postId", getPostVotes);
router.put("/voteA/:voteId", verifyToken, voteA);
router.put("/voteB/:voteId", verifyToken, voteB);
router.get("/getVotes", verifyToken, getVotes);

export default router;
