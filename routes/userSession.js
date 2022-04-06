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
    key: "member",
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

//로그인한 유저 정보를 받아와 session 생성
router.post("/create", (req, res) => {
  const body = req.body;
  const { user_id, password } = body;
  console.log("POST=USER_SESSION/CREATE REQUEST");
  models.User.findOne({
    where: {
      user_id,
      password,
    },
  })
    .then((result) => {
      const member = result.dataValues;
      console.log("===>회원확인", member);
      req.session.member = {
        isLogin: true,
        id: member.id,
        name: member.user_name,
        isSubscriber: member.isSubscriber,
      };
      req.session.save(() => {
        console.log("====>유저세션 저장", req.session.member);
        res.json({ answer: true, user: req.session.member });
      });
    })
    .catch((err) => {
      console.log("===>가입된 회원없음");
      res.send({ answer: false, msg: "아이디와 비밀번호 확인 부탁드립니다" });
    });
});

router.get("/", (req, res) => {
  console.log("GET=USER_SESSION REQUEST");
  req.session.reload(() => {
    if (req.session.member) {
      models.User.findOne({
        where: {
          id: req.session.member.id,
        },
      })
        .then((result) => {
          const member = result.dataValues;
          req.session.member = {
            isLogin: true,
            id: req.session.member.id,
            name: member.user_name,
            isSubscriber: member.isSubscriber,
          };
          console.log("userSession :", req.session);
          req.session.save(() => {
            res.send({ answer: true, user: req.session.member });
          });
        })
        .catch((err) => {
          console.log("/userSession NOT FOUND ID ");
          res.send({
            answer: false,
            msg: "USERSESSION ERROR MESSAGE: 세션아이디와 일치하는 아이디가 없습니다",
          });
        });
    } else {
      console.log("===>NOT EXIST USER_SESSION ");
      res.send({
        answer: false,
        msg: "USERSESSION ERROR MESSAGE: 유저 세션이 존재하지 않습니다.",
      });
    }
  });
});

router.get("/delete", (req, res) => {
  console.log("GET=USER_SESSION/DELETE REQUEST");
  if (req.session.member) {
    console.log("로그아웃......", req.session.member);
    req.session.destroy(() => {
      res.json({ answer: true, logout: true });
    });
  } else {
    res.send({ logout: false });
  }
});

module.exports = router;
