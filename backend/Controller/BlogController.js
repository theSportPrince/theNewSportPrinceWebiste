const asyncHandler = require("express-async-handler");
const Blog = require("../Models/BlogModel");
const User = require("../Models/UserModal");

// const createBlog = asyncHandler(async (req, res) => {
//   try {
//     const { title, description, imageUrl, userId } = req.body;

//     if (!userId || !title || !description || !imageUrl) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     const Blogger = await User.findById(userId);
//     if (!Blogger) {
//       res.status(404);
//       throw new Error("User not found");
//     }

//     const blog = new Blog({
//       title,
//       description,
//       imageUrl,
//       user: userId,
//     });

//     const createdBlog = await blog.save();
//     res.status(201).json(createdBlog);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });

const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, description, imageUrls, user } = req.body;
    console.log(imageUrls);

    if (!user || !title || !description || !imageUrls || imageUrls.length === 0) {
      return res.status(400).json({ error: "All fields are required and imageUrl should be a non-empty array." });
    }

    const Blogger = await User.findById(user);
    if (!Blogger) {
      res.status(404);
      throw new Error("User not found");
    }

    const blog = new Blog({
      title,
      description,
      imageUrls,
      user: user,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(404).json(error);
  }
});


const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate("user", "name email");
  res.json(blogs);
});

const updateBlog = asyncHandler(async (req, res) => {
  const { title, description, imageUrl, userId } = req.body;

  if (!userId || !title || !description || !imageUrl) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  blog.title = title;
  blog.description = description;
  blog.imageUrl = imageUrl;
  blog.user = userId;

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
