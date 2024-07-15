const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  createPoll,
  getPolls,
  updatePoll,
  deletePoll,
  getLatestPoll,
  togglePollState,
} = require("../Controller/PollController");

router.route("/polls/create").post(asyncHandler(createPoll));
router.route("/polls").get(asyncHandler(getPolls));
router.route("/polls/update/:id").put(asyncHandler(updatePoll));
router.route("/polls/latest/:blogId").get(asyncHandler(getLatestPoll));
router.route("/polls/delete/:id").delete(asyncHandler(deletePoll));
router.route("/polls/toggle/:id").put(asyncHandler(togglePollState));


module.exports = router;
