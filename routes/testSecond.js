const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("test 세컨서버 전달완료 ");
});

module.exports = router;
