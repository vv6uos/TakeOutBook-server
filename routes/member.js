const express = require("express");
const { Book, User, UserBook } = require("../models");
const router = express.Router();
const models = require("../models");

router.get("/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  console.log("GET=MEMBER REQUEST");
  models.User.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      const member = result.dataValues;
      console.log("===>회원확인", member);
      res.send({ answer: true, member: member });
    })
    .catch((err) => {
      console.log("===>일치하는 회원번호 없음");
      res.json({
        answer: false,
        msg: "MEMBER ERROR MESSAGE: 회원번호와 일치하는 회원이 없습니다",
      });
    });
});

router.post("/changeSubscribeStatus", (req, res) => {
  const body = req.body;
  const { memberId, subscribeStatusToChange } = body;

  models.User.update(
    { isSubscriber: subscribeStatusToChange },
    { where: { id: memberId } }
  )
    .then((result) => {
      console.log("유저 구독정보 업데이트 성공 : ", result);
      res.send({
        result,
      });
    })
    .catch((err) => {
      console.log("유저 구독정보 업데이트 실패 : ", err);
      res.send({
        err,
      });
    });
});

module.exports = router;
