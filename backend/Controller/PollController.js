const asyncHandler = require("express-async-handler");
const Poll = require("../Models/PollModel");

// Create a new poll
const createPoll = asyncHandler(async (req, res) => {
  try {
    const { title, question, options, blog } = req.body;

    if (!title || !question || !options || options.length !== 2 || !blog) {
      return res.status(400).json({
        error: "All fields are required, options should contain exactly 2 items, and blog must be provided.",
      });
    }

    const poll = new Poll({
      title,
      question,
      options,
      blog,
    });

    const createdPoll = await poll.save();
    res.status(201).json(createdPoll);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get all polls
const getPolls = asyncHandler(async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 }).populate('blog');
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a poll
const updatePoll = asyncHandler(async (req, res) => {
  const { title, question, options, blog } = req.body;

  if (!title || !question || !options || options.length !== 4 || !blog) {
    return res.status(400).json({
      error: "All required fields must be provided, options should contain exactly 4 items, and blog must be provided.",
    });
  }

  const poll = await Poll.findById(req.params.id);
  if (!poll) {
    return res.status(404).json({ error: "Poll not found" });
  }

  // Update the poll fields
  poll.title = title;
  poll.question = question;
  poll.options = options;
  poll.blog = blog;

  const updatedPoll = await poll.save();
  res.json(updatedPoll);
});

// Delete a poll
const deletePoll = asyncHandler(async (req, res) => {
  const poll = await Poll.findByIdAndDelete(req.params.id);

  if (!poll) {
    res.status(404);
    throw new Error("Poll not found");
  }
  res.json({ message: "Poll removed" });
});

// Get the latest poll
const getLatestPoll = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  try {
    const latestPoll = await Poll.findOne({ blog: blogId, isActive: true }).sort({ createdAt: -1 }).populate('blog');
    res.json(latestPoll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const togglePollState = asyncHandler(async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  
  if (!poll) {
    return res.status(404).json({ error: "Poll not found" });
  }

  poll.isActive = !poll.isActive;
  const updatedPoll = await poll.save();
  
  res.json(updatedPoll);
});

module.exports = { createPoll, getPolls, updatePoll, deletePoll, getLatestPoll ,togglePollState};
