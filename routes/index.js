const express = require("express");
const router = express.Router();

const test = require("./test.js");

const books = require("./books");
const loginSession = require("./loginSession");
const user = require("./user.js");
const bestsellers = require("./bestsellers");
const userBooks = require("./userBooks");

router.use("/books", books);
router.use("/userBooks", userBooks);
router.use("/user", user);
router.use("/bestsellers", bestsellers);
router.use("/loginSession", loginSession);
router.use("/test", test);

module.exports = router;
