import Vote from "../models/vote.model.js";

export const createVote = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    const newVote = new Vote({
      content,
      postId,
      userId,
    });
    await newVote.save();

    res.status(200).json(newVote);
  } catch (error) {
    next(error);
  }
};

export const getPostVotes = async (req, res, next) => {
  try {
    const votes = await Vote.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(votes);
  } catch (error) {
    next(error);
  }
};

export const voteA = async (req, res, next) => {
  try {
    const vote = await Vote.findById(req.params.voteId);
    if (!vote) {
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = vote.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      vote.aVote += 1;
      vote.likes.push(req.user.id);
    } else {
      vote.aVote -= 1;
      vote.likes.splice(userIndex, 1);
    }
    await vote.save();
    res.status(200).json(vote);
  } catch (error) {
    next(error);
  }
};

export const voteB = async (req, res, next) => {
  try {
    const vote = await Vote.findById(req.params.voteId);
    if (!vote) {
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = vote.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      vote.bVote += 1;
      vote.likes.push(req.user.id);
    } else {
      vote.bVote -= 1;
      vote.likes.splice(userIndex, 1);
    }
    await vote.save();
    res.status(200).json(vote);
  } catch (error) {
    next(error);
  }
};

export const getVotes = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(403, "You are not allowed to get all comments"));
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const votes = await Vote.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalVotes = await Vote.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastVotes = await Vote.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ votes, totalVotes, lastVotes });
  } catch (error) {
    next(error);
  }
};
