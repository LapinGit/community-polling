import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createVote,
  getPostVotes,
  getVotes,
  voteBox,
} from "../controllers/vote.contoller.js";

const router = express.Router();
router.post("/create", verifyToken, createVote);
router.get("/getPostVotes/:postId", getPostVotes);
router.put("/voteBox/:voteId", verifyToken, voteBox);
router.get("/getVotes", verifyToken, getVotes);

export default router;
