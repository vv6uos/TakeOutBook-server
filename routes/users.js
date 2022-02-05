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
      res.send({
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send("유저정보 등록 실패 ");
    });
});

module.exports = router;
