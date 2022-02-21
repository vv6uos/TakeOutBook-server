const express = require("express");
const router = express.Router();

const testFirst = require("./testFirst.js");
const testSecond = require("./testSecond.js");
const bestsellers = require("./bestsellers");
const books = require("./books");
const register = require("./register.js");
const userSession = require("./userSession");
const member = require("./member.js");

router.use("/userSession", userSession);
router.use("/testFirst", testFirst);
router.use("/testSecond", testSecond);
router.use("/bestsellers", bestsellers);
router.use("/books", books);
router.use("/register", register);
router.use("/member", member);

module.exports = router;
