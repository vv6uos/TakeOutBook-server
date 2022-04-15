const express = require("express");
const { Book, User, UserBook } = require("../models");
const router = express.Router();

//회원이 책을 대여하면 UserBooks데이터 생성,해당 도서 데이터 컬럼 "onRent" 상태를 변경
router.get("/create", (req, res) => {
  const { userId, bookId } = req.query;
  const now = Date.now();
  console.log(userId);
  console.log(bookId);
  console.log("GET/USERBOOKS/CREATE REQUEST");
  UserBook.create({
    rentAt: new Date(now),
    rentBy: new Date(now + 7 * 24 * 60 * 60 * 1000),
    fk_user_id: userId,
    fk_book_id: bookId,
  })
    //결과 클라이언트에 전달
    .then((result) => {
      console.log(
        "===>USERBOOKS CREATE : userId [",
        userId,
        "] , bookId [",
        bookId,
        "]"
      );
      Book.update({ onRent: true }, { where: { id: bookId } })
        .then((result) => {
          console.log("====>BOOK 대여상태 변경완료");
          res.json({ answer: true });
        })
        .catch((err) => {
          console.log("====>BOOK 대여상태 변경 실패 ");
          res.json({
            answer: false,
            msg: "USERBOOKS/CREATE/BOOK ERROR MESSAGE: 서버관리자에게 문의 부탁드립니다",
          });
        });
    })
    .catch((err) => {
      console.log("===>USERBOOKS 데이터 생성 실패");
      res.json({
        answer: false,
        msg: "USERBOOKS/CREATE ERROR MESSAGE:  서버관리자에게 문의 부탁드립니다",
      });
    });
});

module.exports = router;
