const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get("/books", (req, res) => {
  res.send("책 정보 json데이터입니다!");
});

app.listen(port, () => {
  console.log(`서버가 돌아갑니다`);
});
