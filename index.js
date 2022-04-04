const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 8080;
const models = require("./models");
const router = require("./routes/index");

const whiteList = ["https://takeoutbook.kr", "http://localhost:3000"];
const corsOpt = {
  origin: function (origin, cb) {
    if ((whiteList, indexOf(origin) !== -1)) {
      cb(null, true);
    } else {
      cb(new Error("NOT Allowed ORIGIN"));
    }
  },
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOpt));

app.use(router);

app.listen(port, () => {
  console.log(`서버가 돌아갑니다`);
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB연결성공");
    })
    .catch((err) => {
      console.log("DB연결실패", err);
      process.exit();
    });
});
