import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    aVote: {
      type: Number,
      default: 0,
    },
    bVote: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false, 
   },

);

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
