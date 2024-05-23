const asyncHandler = require("express-async-handler");
const Blog = require("../Models/BlogModel");
const User = require("../Models/UserModal");

// Create Blog
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
      weatherreport,
      pitchreport,
      squad,
      teamnews,
      predictionresult,
      TeamA,
      TeamB,
      teamaname,
      teambname
    } = req.body;

    if (
      !title ||
      !description ||
      !user
    ) {
      return res.status(400).json({
        error: "All fields are required.",
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
      weatherreport,
      pitchreport,
      squad,
      teamnews,
      predictionresult,
      TeamA,
      TeamB,
      teamaname,
      teambname
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Blogs
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate("user", "name email").sort({ createdAt: -1 });
  console.log("this is the blog",blogs)
  res.json(blogs);
});

// Update Blog
const updateBlog = asyncHandler(async (req, res) => {
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
    weatherreport,
    pitchreport,
    squad,
    teamnews,
    predictionresult,
    TeamA,
    TeamB,
    teamaname,
    teambname
  } = req.body;

  if (
    !title ||
    !description ||
    !user ||
    !videoUrl ||
    !matchtitle ||
    !venue ||
    !date ||
    !live ||
    !weatherreport ||
    !pitchreport ||
    !squad ||
    !teamnews ||
    !predictionresult ||
    !TeamA ||
    !TeamB ||
    !teamaname ||
    !teambname
  ) {
    return res.status(400).json({
      error: "All fields are required.",
    });
  }

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  const blogger = await User.findById(user);
  if (!blogger) {
    return res.status(404).json({ error: "User not found" });
  }

  blog.title = title;
  blog.description = description;
  blog.imageUrls = imageUrls;
  blog.videoUrl = videoUrl;
  blog.user = user;
  blog.matchtitle = matchtitle;
  blog.venue = venue;
  blog.date = date;
  blog.live = live;
  blog.weatherreport = weatherreport;
  blog.pitchreport = pitchreport;
  blog.squad = squad;
  blog.teamnews = teamnews;
  blog.predictionresult = predictionresult;
  blog.TeamA = TeamA;
  blog.TeamB = TeamB;
  blog.teamaname = teamaname;
  blog.teambname = teambname;

  const updatedBlog = await blog.save();
  res.json(updatedBlog);
});

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.json({ message: "Blog removed" });
});

module.exports = { createBlog, getBlogs, updateBlog, deleteBlog };
