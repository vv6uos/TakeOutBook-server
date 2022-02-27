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
//id가 일치하는 Book 데이터 클라에 전달
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

//id가 일치하는 Book 의 onRent: true 변경, userBook데이터 생성
router.post("/:id/rent", (req, res) => {
  //params에서 bookId를 받아온다
  models.Book.update({ onRent: true }, { where: { id: req.params.id } })
    .then((result) => {
      const now = Date.now();
      //사용자가 보내온 memberId를 이용해서 userBook 데이터 생성
      models.UserBook.create({
        rentAt: new Date(now),
        rentBy: new Date(now + 7 * 24 * 60 * 60 * 1000),
        fk_user_id: req.body.memberId,
        fk_book_id: req.params.id,
      })
        //결과 클라이언트에 전달
        .then((result) => {
          console.log("/book(", req.params.id, ") onRent 변경 SUCCESS ");
          console.log("userBook Data create : ", result);
          res.send(true);
        })
        .catch((err) => {
          console.log("userBook Data create ERR", err);
          res.send(false);
        });
    })
    .catch((err) => {
      console.log("/book(", bookId, ")onRent 변경 ERROR", err);
      res.send(false);
    });
});

module.exports = router;
