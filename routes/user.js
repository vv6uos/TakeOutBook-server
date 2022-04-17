const express = require("express");
const router = express.Router();
const models = require("../models");

const { User } = models;

router.post("/create", (req, res) => {
  const body = req.body;
  const { user_id, password, user_name, email, address, phoneNumber } = body;
  console.log(`>>>POST=USER/CREATE`);
  User.create({
    user_id,
    user_name,
    password,
    email,
    address,
    phoneNumber,
  })
    .then((result) => {
      console.log("===>>회원 생성결과 : ", result);
      res.json({ answer: true });
    })
    .catch((err) => {
      console.log("===>>회원 생성 실패 ", err);
      res.send({
        answer: false,
        msg: "USER/CREATE ERROR MESSAGE: 서버관리자에게 문의 부탁드립니다.",
      });
    });
});

//회원 API
router.get("/read/:id", (req, res) => {
  const id = req.params.id;
  console.log(`>>>GET=USER:${id} READ REQUEST`);
  User.findOne({
    where: {
      id,
    },
  })
    .then((result) => {
      const user = result.dataValues;
      console.log("===>>회원확인", user);
      res.send({ answer: true, user: user });
    })
    .catch((err) => {
      console.log("===>>일치하는 회원번호 없음");
      res.json({
        answer: false,
        msg: "USER ERROR MESSAGE: 회원번호와 일치하는 회원이 없습니다",
      });
    });
});

// 유저의 구독상태를 변경하는 API
router.post("/update/subscribe", (req, res) => {
  const body = req.body;
  const { userId, subscribeStatusToChange } = body;
  console.log(`>>>POST=USER/UPDATE/SUBSCRIBE?userId=${userId}`);
  User.update(
    { isSubscriber: subscribeStatusToChange },
    { where: { id: userId } }
  )
    .then((result) => {
      console.log(`===>> 유저구독정보 변경 완료`);
      res.json({ answer: true });
    })
    .catch((err) => {
      console.log("===>> 유저 구독정보 변경 실패 : ", err);
      res.send({
        answer: false,
        msg: "USER/UPDATE:subscribe ERROR MESSAGE: 서버관리자에게 문의 부탁드립니다.",
      });
    });
});

router.post("/read/userId", (req, res) => {
  const body = req.body;
  const { user_id } = body;
  console.log(`>>>POST=USER/READ/USERID?${user_id}`);
  User.findOne({
    where: {
      user_id,
    },
  })
    .then((result) => {
      //result null방지
      const user = result.dataValues;
      console.log("===>>ID 일치하는 USER 있음", result);
      res.send({ answer: true });
    })
    .catch((err) => {
      console.log("===>>ID 일치하는 USER 찾기 실패");
      res.send({ answer: false });
    });
});

module.exports = router;
