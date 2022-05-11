const express = require("express");
const router = express.Router();
const models = require("../models");

const { User } = models;

router.post("/", (req, res) => {
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
      console.log("===>>USER 생성결과 : ", result);
      res.json({ answer: true });
    })
    .catch((err) => {
      console.log("===>>USER 생성 실패 ", err);
      res.send({
        answer: false,
      });
    });
});

//회원정보를 불러오는 API (임시)
router.get("/:id", (req, res) => {
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
      });
    });
});

// 유저의 구독상태를 변경하는 API
router.post("/:id/subscribe", (req, res) => {
  const id = req.params.id;
  const { subscribeStatusToChange } = req.body;
  console.log(`>>>POST=USER/UPDATE/SUBSCRIBE?userId=${id}`);
  User.update({ isSubscriber: subscribeStatusToChange }, { where: { id } })
    .then((result) => {
      console.log(`===>> 유저구독정보 변경 완료`);
      res.json({ answer: true });
    })
    .catch((err) => {
      console.log("===>> 유저 구독정보 변경 실패 : ", err);
      res.send({
        answer: false,
      });
    });
});

module.exports = router;
