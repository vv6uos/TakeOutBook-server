const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", (req, res) => {
  models.User.findAll({
    order: ["id"],
    attributes: ["id", "user_id", "password"],
  })
    .then((result) => {
      console.log("user정보 전달");
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("users DB를 불러오는데 실패했습니다.");
    });
});

module.exports = router;
