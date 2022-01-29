const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", (req, res) => {
  models.Book.findAll({
    order: [["id"]],
    attributes: ["id", "name", "imgURL"],
  })
    .then((result) => {
      console.log("베스트셀러 데이터 전달");
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("베스트셀러상품을 리스트 하는 중 오류가 발생했습니다.");
    });
});

module.exports = router;
