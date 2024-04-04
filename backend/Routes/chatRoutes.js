const express = require("express");
const router = express.Router();
const {accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup}=require("../Controller/chatController");

router.post("/", accessChat);
router.get("/chat", fetchChats);
router.post("/group", createGroupChat);
router.put("/rename", renameGroup);
router.put("/groupremove", removeFromGroup);
router.put("/groupadd",addToGroup);

module.exports = router;
