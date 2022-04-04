const express = require("express");
// const redis = require("redis");
const router = express.Router();
const models = require("../models");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const connectRedis = require("connect-redis");
// const RedisStore = connectRedis(session);

// const redisClient1 = redis.createClient({
//   url: "redis://:p7fade2cb9ca46db931204b0f81286740738b744fd19fcf077010a3d79b6ebe01@ec2-44-196-70-155.compute-1.amazonaws.com:27729",
// });

// const redisStoreInfo = {
//   logErrors: true,
//   client: redisClient1,
// };

const prod = process.env.NODE_ENV === "production";

router.use(
  session({
    key: "TBOsession",
    secret: "aaaserret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      samesite: "none",
      secure: prod ? true : false,
      domain: prod && ".takeoutbook.kr",
      maxAge: 60 * 60 * 1000,
    },
    // store: new RedisStore(redisStoreInfo),
  })
);
router.use(cookieParser());

router.get("/createSession", (req, res) => {
  req.session.TBOsession = {
    result: "결과",
  };

  req.session.save(() => {
    console.log("TEST세션저장완료");
    res.json({ msg: "=>TEST세션저장완료", session: req.session.TBOsession });
  });
});

//세션 저장의 문제인지 살펴 볼 필요가 있다... 로컬에서는 가능...
router.get("/loadSession", (req, res) => {
  console.log("loadSession 시작------");
  if (req.session.TBOsession) {
    console.log("TBO세션 O");
    res.send({ msg: "TBO세션이 있습니다.", session: req.session.TBOsession });
  } else {
    console.log("TBO세션 x");
    res.send("TBO세션 x");
  }
});

router.post("/findUser", (req, res) => {
  console.log("AXIOS TEST");
  const body = req.body;
  const { user_id, password } = body;
  console.log("TEST:유저찾기,POST VALUE: ", body);
  models.User.findOne({
    where: {
      user_id,
      password,
    },
  })
    .then((result) => {
      console.log("FIND USER TEST", result);
      res.json({ msg: "FindUser post결과값", result });
    })
    .catch((err) => {
      console.log("일치하는 UserData 없음", err);
      res.send({ msg: "일치하는 userdata없음" });
    });
});

module.exports = router;
