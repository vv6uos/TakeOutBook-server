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
      // httpOnly: true,
      //HTTP 통신에서 javascript를 주입해서 쿠키의 정보를 얻으려 하는경우 탈취 X
      samesite: "strict",
      secure: prod ? true : false,
      domain: prod && ".takeoutbook.kr",
      path: "/",
      maxAge: 60 * 60 * 1000,
      path: "/",
    },
  })
);
router.use(cookieParser(process.env.COOKIE_SECRET));

//로그인한 유저 정보를 받아와 session 생성
router.post("/create", (req, res) => {
  const body = req.body;
  const { user_id, password } = body;
  console.log("TEST: 로그인정보 전달 했나? ", body);

  models.User.findOne({
    where: {
      user_id,
      password,
    },
  })
    .then((result) => {
      console.log("로그인 회원정보", result);
      const member = result.dataValues;
      req.session.member = {
        isLogin: true,
        id: member.id,
        name: member.user_name,
        isSubscriber: member.isSubscriber,
      };

      console.log("SESSION.LOGINDATA", req.session);
      req.session.save(() => {
        res.json({ user: req.session.member });
      });
    })
    .catch((err) => {
      console.log("일치하는 UserData 없음", err);
      res.send({ user: { isLogin: false } });
    });
});

router.get("/", (req, res) => {
  console.log("session test : 지금 usersession 시작");
  if (req.session.member) {
    console.log("session test : 세션있으면 User 찾아라 ");
    models.User.findOne({
      where: {
        id: req.session.member.id,
      },
    })
      .then((result) => {
        console.log(
          "session test : 세션이랑 일치하는 아이디 찾았으면 세션 업데이트해! "
        );
        const member = result.dataValues;
        req.session.member = {
          isLogin: true,
          id: req.session.member.id,
          name: member.user_name,
          isSubscriber: member.isSubscriber,
        };
        console.log("userSession :", req.session);
        req.session.save(() => {
          res.send({ user: req.session.member });
        });
      })
      .catch((err) => {
        console.log("/userSession NOT FOUND ID ");
      });
  } else console.log("No req.session.member ");
});

router.get("/delete", (req, res) => {
  if (req.session.member) {
    console.log("로그아웃......", req.session.member);
    req.session.destroy(() => {
      res.json({ logout: true });
    });
  } else {
    res.send({ logout: false });
  }
});

module.exports = router;
