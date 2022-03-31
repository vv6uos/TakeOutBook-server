const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/", (req, res) => {
  const body = req.body;
  const { user_id, password, user_name, email, address, phoneNumber } = body;
  models.User.create({
    user_id,
    user_name,
    password,
    email,
    address,
    phoneNumber,
  })
    .then((result) => {
      console.log("회원정보등록결과 : ", result);
      res.json({
        result,
      });
    })
    .catch((err) => {
      console.log("유저정보 등록 실패 ", err);
      res.send({
        err,
      });
    });
});
router.post("/checkId", (req, res) => {
  const body = req.body;
  const { user_id } = body;
  models.User.findOne({
    where: {
      user_id,
    },
  })
    .then((result) => {
      console.log("회원가입 아이디 중복확인", result.dataValues);
      res.send(false);
    })
    .catch((err) => {
      console.log("일치하는 ID 없음", err);
      res.send(true);
    });
});

module.exports = router;
