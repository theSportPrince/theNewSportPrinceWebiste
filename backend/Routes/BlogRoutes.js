const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require("../Controller/BlogController");

router.route("/create").post(asyncHandler(createBlog));

router.route("/fetch").get(asyncHandler(getBlogs));

router.route("/update/:id").put(asyncHandler(updateBlog));

router.route("/delete/:id").delete(asyncHandler(deleteBlog));

module.exports = router;
