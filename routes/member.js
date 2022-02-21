const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/subscribe", (req, res) => {
  const body = req.body;
  const { id, subscribe } = body;

  
  models.User.update({ subscribe }, { where: { id } })
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
