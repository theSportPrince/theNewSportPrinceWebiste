const express = require("express");
const router = express.Router();
const { sendMessage,allMessages } = require("../Controller/messageController");



router.post("/", sendMessage);
router.get("/:chatId",allMessages);
module.exports = router;
