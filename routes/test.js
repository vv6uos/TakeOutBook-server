const express = require("express");
const router = express.Router();
const models = require("../models");
const session = require("express-session");
const cookieParser = require("cookie-parser");
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
  })
);
router.use(cookieParser());

router.get("/", (req, res) => {
  req.session.TBOsession = {
    result: "결과",
  };

  req.session.save(() => {
    res.json({ msg: "=>세션저장완료", session: req.session.TBOsession });
  });
});

module.exports = router;
