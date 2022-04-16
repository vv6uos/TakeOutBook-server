const express = require("express");
const { Book, User, UserBook, Sequelize } = require("../models");
const router = express.Router();

//회원의 책 대여 API : UserBook CREATE,Book UPDATE[onRent:true]
router.get("/create", (req, res) => {
  const { userId, bookId } = req.query;
  const now = Date.now();
  console.log("GET/USERBOOKS/CREATE REQUEST");
  //UserBook 데이터 생성
  UserBook.create({
    rentAt: new Date(now),
    rentBy: new Date(now + 7 * 24 * 60 * 60 * 1000),
    fk_user_id: userId,
    fk_book_id: bookId,
  })
    .then((result) => {
      console.log(
        "===>USERBOOKS CREATE : userId [",
        userId,
        "] , bookId [",
        bookId,
        "]"
      );
      //Book 정보 변경
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

//회원의 대여책 현황 : UserBook FIND(ALL), Book READ
router.get("/read/user/:userId/onRent", (req, res) => {
  const { userId } = req.params;

  console.log(`GET=USERBOOKS/READ/USER?${userId}/onRent REQUEST`);
  UserBook.findAll({
    include: [
      {
        model: Book,
        attributes: ["name", "imgURL", "onRent"],
      },
    ],
    where: {
      fk_user_id: userId,
      returnAt: null,
    },
  })
    .then((result) => {
      console.log(`===>${userId}번 회원 대여현황 불러옴`);
      res.send({ answer: true, result: result });
    })
    .catch((err) => {
      console.log("===>일치하는 USERBOOK 데이터 없음", err);
      res.json({
        answer: false,
        msg: "USERBOOKS READ ERROR MESSAGE: 회원의 대여 책 현황을 불러 올 수 없습니다",
        err,
      });
    });
});

//반납한 책 불러오는 API
router.get("/read/user/:userId/returned", (req, res) => {
  const { userId } = req.params;

  console.log(`GET=USERBOOKS/READ/USER?${userId}/returned REQUEST`);
  UserBook.findAll({
    include: [
      {
        model: Book,
        attributes: ["name", "imgURL", "onRent"],
      },
    ],
    where: {
      fk_user_id: userId,
      //returnAt 데이터가 null이 아닌 경우
      returnAt: { [Sequelize.Op.ne]: null },
    },
  })
    .then((result) => {
      console.log(`===>${userId}번 회원이 읽은 도서 불러옴`);
      res.send({ answer: true, result: result });
    })
    .catch((err) => {
      console.log("===>일치하는 USERBOOK 데이터 없음", err);
      res.json({
        answer: false,
        msg: "USERBOOKS READ ERROR MESSAGE: 회원의 지난 대여 도서를 불러 올 수 없습니다",
        err,
      });
    });
});

//책 반납 API : UserBook UPDATE[+returnAt],Book UPDATE[onRent:false]
router.get("/update", (req, res) => {
  const { userBookId, bookId } = req.query;
  const now = Date.now();
  console.log(
    `"GET/USERBOOKS/UPDATE?userBookId=${userBookId}&bookId=${bookId} REQUEST"`
  );
  //UserBook returnAt 데이터 입력
  UserBook.update(
    {
      returnAt: new Date(now),
    },
    { where: { rental_id: userBookId } }
  )
    .then((result) => {
      console.log("===>USERBOOK 변경", result);
      //Book 정보 변경
      Book.update({ onRent: false }, { where: { id: bookId } })
        .then((result) => {
          console.log("====>BOOK 대여상태 변경완료");
          res.json({ answer: true });
        })
        .catch((err) => {
          console.log("====>BOOK 대여상태 변경 실패 ");
          res.json({
            answer: false,
            msg: "USERBOOKS/UPDATE ERROR MESSAGE: 서버관리자에게 문의 부탁드립니다",
          });
        });
    })
    .catch((err) => {
      console.log("===>USERBOOKS 데이터 수정 실패");
      res.json({
        answer: false,
        msg: "USERBOOKS/UPDATE ERROR MESSAGE:  서버관리자에게 문의 부탁드립니다",
      });
    });
});
module.exports = router;
