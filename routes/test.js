const express = require("express");
const router = express.Router();
const axios = require("axios");

const URL = "http://localhost:8080/userSession/get";

router.get("/", (req, res) => {
  axios.get(URL).then((result) => {
    res.send("실행중 ", result);
  });
});
module.exports = router;
