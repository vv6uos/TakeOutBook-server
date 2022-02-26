const express = require("express");
const router = express.Router();

const testFirst = require("./testFirst.js");
const testSecond = require("./testSecond.js");
const books = require("./books");
const register = require("./register.js");
const userSession = require("./userSession");
const member = require("./member.js");
const bestsellers = require("./bestsellers");

router.use("/testFirst", testFirst);
router.use("/testSecond", testSecond);
router.use("/books", books);
router.use("/register", register);
router.use("/member", member);
router.use("/bestsellers", bestsellers);
router.use("/userSession", userSession);

module.exports = router;
