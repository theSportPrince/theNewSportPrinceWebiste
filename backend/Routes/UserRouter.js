const express = require("express");
const router = express.Router();
const UserController = require("../Controller/UserController");
const passport = require("passport");

router.post("/register", UserController.register);
router.post("/user/login",UserController.login)
router.get("/user", UserController.getAllUser);
router.get("/user/profile", UserController.fetchUser);
router.put("/user/update", UserController.updateUser);
router.post("/contactus", UserController.contactus);

module.exports = router;
