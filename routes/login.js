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
        res.send({ isLoginIn: true, User: req.session.loginData });
      });
    })
    .catch((err) => {
      console.log("일치하는 UserData 없음", err);
      res.send({ isLoginIn: false });
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
router.get("/logOut", (req, res) => {
  if (session.loginData) {
    res.json({ loggedIn: true, loginData: session.loginData });
  } else {
    res.send({ loggedIn: false });
  }
});

module.exports = router;
