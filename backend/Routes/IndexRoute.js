const express = require('express');
const router = express.Router();
const exampleController =require("../Controller/IndexController");
router.get('/', exampleController.index);

module.exports = router;