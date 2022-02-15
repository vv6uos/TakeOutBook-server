const express = require("express");
const router = express.Router();
const testFirst = require("./testFirst.js");
const testSecond = require("./testSecond.js");
const bestsellers = require("./bestsellers");
const books = require("./books");
const register = require("./register.js");
const login = require("./login");

router.use("/", login);
router.use("/testFirst", testFirst);
router.use("/testSecond", testSecond);
router.use("/bestsellers", bestsellers);
router.use("/books", books);
router.use("/register", register);

module.exports = router;
