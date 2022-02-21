const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", (req, res) => {
  res.send("https://www.miricanvas.com/v/1w1y7s");
});

module.exports = router;
