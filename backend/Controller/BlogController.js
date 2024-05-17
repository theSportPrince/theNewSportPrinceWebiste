const asyncHandler = require("express-async-handler");
const Blog = require("../Models/BlogModel");
const User = require("../Models/UserModal");

const createBlog = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrls,
      videoUrl,
      user,
      matchtitle,
      venue,
      date,
      live,
      weatherReport,
      pitchReport,
      Squad,
      TeamNews,
      PredictionResult,
      TeamA,
      TeamB,
      teambname,
      teamaname,
    } = req.body;

    if (
      !user ||
      !title ||
      !description ||
      !imageUrls ||
      imageUrls.length === 0 ||
      !videoUrl ||
      !matchtitle ||
      !venue ||
      !date ||
      !live ||
      !TeamA ||
      !TeamB ||
      !teambname ||
      !teamaname
    ){
      return res.status(400).json({
        error:
          "All fields are required and imageUrl should be a non-empty array. Player names should contain exactly 11 players.",
      });
    }

    const blogger = await User.findById(user);
    if (!blogger) {
      return res.status(404).json({ error: "User not found" });
    }

    const blog = new Blog({
      title,
      description,
      imageUrls,
      videoUrl,
      user,
      matchtitle,
      venue,
      date,
      live,
      weatherreport: weatherReport || "",
      pitchreport: pitchReport || "",
      squad: Squad || "", 
      teamnews: TeamNews || "",
      predictionresult: PredictionResult || "",
      TeamA,
      TeamB,
      teambname,
      teamaname,
    });

    console.log("this is the blog",blog)

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(500).json({ error });
  }
});

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate("user", "name email");
  res.json(blogs);
});

const updateBlog = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    imageUrls,
    videoUrl,
    userId,
    matchtitle,
    venue,
    date,
    live,
    weatherReport,
    pitchReport,
    Squad,
    TeamNews,
    PredictionResult,
    TeamA,
    TeamB,
    teambname,
    teamaname,
  } = req.body;

  if (
    !userId ||
    !title ||
    !description ||
    !imageUrls ||
    imageUrls.length === 0 ||
    !videoUrl ||
    !matchtitle ||
    !venue ||
    !date ||
    !live
  ) {
    return res.status(400).json({
      error:
        "All required fields must be provided, and imageUrl should be a non-empty array.",
    });
  }

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update the blog fields
  blog.title = title;
  blog.description = description;
  blog.imageUrls = imageUrls;
  blog.videoUrl = videoUrl;
  blog.user = userId;
  blog.matchtitle = matchtitle;
  blog.venue = venue;
  blog.date = date;
  blog.live = live;
  blog.weatherreport = weatherReport || "";
  blog.pitchreport = pitchReport || "";
  blog.squad = Squad || "";
  blog.teamnews = TeamNews || "";
  blog.predictionresult = PredictionResult || "";
  blog.TeamA = TeamA;
  blog.TeamB = TeamB;
  blog.teambname = teambname;
  blog.teamaname = teamaname;

  const updatedBlog = await blog.save();
  res.json(updatedBlog);
});


const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  res.json({ message: "Blog removed" });
});

module.exports = { createBlog, getBlogs, updateBlog, deleteBlog };
