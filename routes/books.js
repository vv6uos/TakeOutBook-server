const express = require("express");
const router = express.Router();
const models = require("../models");

//READ BOOKS 모든 도서 정보 불러오기
router.get("/", (req, res) => {
  console.log(`>>>GET=BOOKS READ REQUEST`);
  models.Book.findAll({
    order: [["onRent"]],
    attributes: ["id", "name", "author", "publisher", "imgURL", "onRent"],
  })
    .then((result) => {
      console.log("===>도서판매상품 데이터 전달");
      res.json({ answer: true, result: result });
    })
    .catch((err) => {
      console.log("===>>BOOKS 불러오기 실패");
      res.json({
        answer: false,
      });
    });
});
//READ BOOK id가 일치하는 도서 불러오기
router.get("/:id", (req, res) => {
  const { id } = req.params;
  
  console.log(`>>>GET=BOOKS:${id} READ REQUEST`);
  models.Book.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log(`===>BOOK 불러옴`);
      res.json({ answer: true, result: result });
    })
    .catch((err) => {
      console.log("===>BOOK 불러오기 실패");
      res.json({
        answer: false,
      });
    });
});

module.exports = router;
