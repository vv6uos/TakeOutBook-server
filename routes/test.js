const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const models = require("../models");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const prod = process.env.NODE_ENV === "production";
dotenv.config();


router.use(
  session({
    key: "TBOsession",
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      samesite: "strict",
      secure: prod ? true : false,
      domain: prod && ".takeoutbook.kr",
      maxAge: 60 * 60 * 1000,
      path: "/",
    },
  })
);
router.use(cookieParser(process.env.COOKIE_SECRET));

router.get("/createSession", (req, res) => {
  req.session.regenerate(() => {
    req.session.TBOsession = {
      result: "FIRST_SESSION",
    };
  });
  console.log("PROD: ", prod);
  try {
    req.session.save(() => {
      console.log("dotenv TEST", process.env.COOKIE_SECRET);
      console.log("TEST세션저장완료");
      res.json({ msg: "=>TEST세션저장완료", session: req.session.TBOsession });
    });
  } catch {
    res.json({ msg: "저장실패: test Session" });
  }
});

router.get("/updateSession", (req, res) => {
  console.log("업데이트_____세션");
  req.session.reload(() => {
    req.session.TBOsession = {
      result: "SECOND_SESSION",
    };
  });
  req.session.save(() => {
    console.log("세션 업데이트 완료");
    res.json({ msg: "=>TEST세션업데이트", session: req.session.TBOsession });
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
      console.log("FIND USER TEST", result.dataValues);
      res.json({ msg: "FindUser post결과값", result: result.dataValues });
    })
    .catch((err) => {
      console.log("일치하는 UserData 없음", err);
      res.send({ msg: "일치하는 userdata없음" });
    });
});

module.exports = router;
