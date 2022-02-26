const express = require("express");
const router = express.Router();
const models = require("../models");

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
