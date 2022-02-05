const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", (req, res) => {
  models.User.findAll({
    order: [["id"]],
    attributes: ["id", "user_id", "password"],
  })
    .then((result) => {
      console.log("모든user정보 전달", result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("users DB를 불러오는데 실패했습니다.");
    });
});

router.post("/register", (req, res) => {
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
      res.send({
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
router.post("/login", (req, res) => {
  const body = req.body;
  const { user_id, password } = body;

  models.User.findOne({
    where: {
      user_id,
      password,
    },
  })
    .then((result) => {
      console.log("로그인 회원정보", result.dataValues);
      res.send("로그인 검색");
    })
    .catch((err) => {
      console.log("일치하는 UserData 없음", err);
      res.send("아이디와 비밀번호를 확인 부탁드립니다.");
    });
});
module.exports = router;
