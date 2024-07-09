const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  createPoll,
  getPolls,
  updatePoll,
  deletePoll,
  getLatestPoll,
} = require("../Controller/PollController");

router.route("/polls/create").post(asyncHandler(createPoll));
router.route("/polls").get(asyncHandler(getPolls));
router.route("/polls/update/:id").put(asyncHandler(updatePoll));
router.route("/polls/latest").get(asyncHandler(getLatestPoll));
router.route("/polls/delete/:id").delete(asyncHandler(deletePoll));

module.exports = router;
