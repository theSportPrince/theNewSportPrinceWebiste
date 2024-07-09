const asyncHandler = require("express-async-handler");
const Poll =require("../Models/PollModel")

const createPoll = asyncHandler(async (req, res) => {
  try {
    const { title, question, options } = req.body;

    if (!title || !question || !options || options.length !== 4) {
      return res.status(400).json({
        error: "All fields are required and options should contain exactly 4 items.",
      });
    }

    const poll = new Poll({
      title,
      question,
      options,
    });

    const createdPoll = await poll.save();
    res.status(201).json(createdPoll);
  } catch (error) {
    res.status(500).json({ error });
  }
});

const getPolls = asyncHandler(async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updatePoll = asyncHandler(async (req, res) => {
  const { title, question, options } = req.body;

  if (!title || !question || !options || options.length !== 4) {
    return res.status(400).json({
      error: "All required fields must be provided and options should contain exactly 4 items.",
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

  const updatedPoll = await poll.save();
  res.json(updatedPoll);
});

const deletePoll = asyncHandler(async (req, res) => {
  const poll = await Poll.findByIdAndDelete(req.params.id);

  if (!poll) {
    res.status(404);
    throw new Error("Poll not found");
  }
  res.json({ message: "Poll removed" });
});

const getLatestPoll = asyncHandler(async (req, res) => {
    try {
      const latestPoll = await Poll.findOne().sort({ createdAt: -1 });
      res.json(latestPoll);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = { createPoll, getPolls, updatePoll, deletePoll,getLatestPoll };
