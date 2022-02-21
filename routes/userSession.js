const express = require("express");
const router = express.Router();
const models = require("../models");
const session = require("express-session");
const cookieParser = require("cookie-parser");

router.use(
  session({
    key: "member",
    secret: "semkSecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60 * 60 * 1000 },
  })
);
router.use(cookieParser());
router.post("/create", (req, res) => {
  const body = req.body;
  const { user_id, password } = body;
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
        subscribe: member.subscribe,
      };

      console.log("SESSION.LOGINDATA", req.session);
      req.session.save(() => {
        res.send({ user: req.session.member });
      });
    })
    .catch((err) => {
      console.log("일치하는 UserData 없음", err);
      res.send({ user: { isLogin: false } });
    });
});

router.get("/", (req, res) => {
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
          subscribe: member.subscribe,
        };
        console.log("userSession :", req.session);
        req.session.save(() => {
          res.send({ user: req.session.member });
        });
      })
      .catch((err) => {
        console.log("/userSession NOT FOUND ID ");
      });
  }
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
