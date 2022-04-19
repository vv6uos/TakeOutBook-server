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
    key: "login",
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,

    cookie: {
      samesite: "strict",
      secure: prod ? true : false,
      domain: prod && ".takeoutbook.kr",
      path: "/",
      maxAge: 60 * 60 * 1000,
    },
  })
);
router.use(cookieParser(process.env.COOKIE_SECRET));

//로그인 하면 로그인세션 생성
router.get("/create", (req, res) => {
  const { userId, password } = req.query;
  console.log(">>>POST=USER_SESSION/CREATE REQUEST");
  models.User.findOne({
    where: {
      user_id: userId,
      password,
    },
  })
    .then((result) => {
      const user = result.dataValues;
      console.log("===>회원확인", user);
      req.session.login = {
        isLogin: true,
        id: user.id,
        name: user.user_name,
        isSubscriber: user.isSubscriber,
      };
      req.session.save(() => {
        console.log("====>>로그인 세션 저장", req.session.login);
        res.json({ answer: true, user: req.session.login });
      });
    })
    .catch((err) => {
      console.log("===>>가입된 회원없음");
      res.json({ answer: false });
    });
});

//로그인세션 최신 USER 데이터로 업데이트 하기
router.get("/", (req, res) => {
  console.log(">>>GET=USER_SESSION REQUEST");
  req.session.reload(() => {
    console.log("==>로그인 세션 불러오기");
    if (req.session.login) {
      console.log("===>LOGIN_SESSION USERID ? ", req.session.login.id);
      models.User.findOne({
        where: {
          id: req.session.login.id,
        },
      })
        .then((result) => {
          const user = result.dataValues;
          console.log("====>User  찾음");
          req.session.login = {
            isLogin: true,
            id: req.session.login.id,
            name: user.user_name,
            isSubscriber: user.isSubscriber,
          };
          req.session.save(() => {
            console.log(
              "=====>>LOGIN_SESSION 업데이트 완료",
              req.session.login
            );
            res.json({ answer: true, result: req.session.login });
          });
        })
        .catch((err) => {
          console.log("====>>일치하는 User 없음");
          res.json({
            answer: false,
          });
        });
    } else {
      console.log("===>>LOGIN_SESSION 없음 ");
      res.json({
        answer: false,
      });
    }
  });
});

//로그인세션 삭제
router.get("/delete", (req, res) => {
  console.log(">>>GET=LOGIN_SESSION/DELETE REQUEST");
  if (req.session.login) {
    console.log("===>LOGIN_SESSION USERID ? ", req.session.login.id);
    req.session.destroy(() => {
      console.log("====>>LOGIN_SESSION 삭제");
      res.json({ answer: true });
    });
  } else {
    console.log("===>>LOGIN_SESSION  없음");
    res.json({ answer: false });
  }
});

module.exports = router;
