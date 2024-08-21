const express = require("express");
const router = express.Router();
const { createUser, userLogin } = require("./controller");

router.post("/login", userLogin);
router.post("/createUser", createUser);
module.exports = router;
