const express = require("express");
const router = express.Router();
const models = require("../models");

//BookDB 대여가능 순으로 정렬해서 클라에 전달
router.get("/", (req, res) => {
  models.Book.findAll({
    order: [["onRent"]],
    attributes: ["id", "name", "author", "publisher", "imgURL", "onRent"],
  })
    .then((result) => {
      console.log("도서판매상품 데이터 전달");
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("상품을 리스트 하는 중 오류가 발생했습니다.");
    });
});

router.get("/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Book.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log(`${id}번 상품데이터 전달`);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("상품 데이터를 받는 중 오류가 발생했습니다.");
    });
});

module.exports = router;
