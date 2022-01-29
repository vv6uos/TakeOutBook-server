const express = require("express");
const router = express.Router();
const testFirst = require("./testFirst.js");
const testSecond = require("./testSecond.js");
const bestsellers = require("./bestsellers");
const books = require("./books");

router.use("/testFirst", testFirst);
router.use("/testSecond", testSecond);
router.use("/bestsellers", bestsellers);
router.use("/books", books);

module.exports = router;
