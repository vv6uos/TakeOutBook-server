const express = require("express");
const router = express.Router();
const models = require("../models");
const session = require("express-session");
const cookieParser = require("cookie-parser");

router.use(
  session({
    secret: "semkSecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60 * 60 * 1000 },
  })
);
router.use(cookieParser());
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
      console.log("로그인 회원정보", result);
      req.session.loginData = result.dataValues;

      console.log("SESSION.LOGINDATA", req.session);
      req.session.save(() => {
        res.send({ isLogin: true, User: req.session.loginData });
      });
    })
    .catch((err) => {
      console.log("일치하는 UserData 없음", err);
      res.send({ isLogin: false });
    });
});

router.get("/loginCheck", (req, res) => {
  if (req.session.loginData) {
    res.send({ loggedIn: true, loginData: req.session.loginData });
    console.log(req.session);
  } else {
    console.log(req.session);
    res.send({ loggedIn: false });
  }
});
router.get("/logout", (req, res) => {
  if (req.session.loginData) {
    console.log("로그아웃......", req.session.loginData.user_id);
    req.session.destroy(() => {
      res.json({ loggedOut: true });
    });
  } else {
    res.send({ loggedOut: false });
  }
});

module.exports = router;
