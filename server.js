const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const models = require("./models");
app.use(express.json());
app.use(cors());

app.get("/bestsellers", (req, res) => {
  models.Book.findAll({
    order: [["id"]],
    attributes: ["id", "name", "imgURL"],
  })
    .then((result) => {
      console.log("베스트셀러 데이터 전달");
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("베스트셀러상품을 리스트 하는 중 오류가 발생했습니다.");
    });
});

app.get("/books", (req, res) => {
  models.Book.findAll({
    order: [["id"]],
    attributes: ["id", "name", "seller", "price", "createdAt", "imgURL"],
  })
    .then((result) => {
      console.log("도서판매상품 데이터 전달");
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("상품을 리스트 하는 중 오류가 발생했습니다.");
    });
});

app.get("/books/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Book.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log(`${id}번 상품데이터 전달`);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("상품 데이터를 받는 중 오류가 발생했습니다.");
    });
});

app.post("/test", (req, res) => {
  const body = req.body;
  res.send("상품이 업로드 되었습니다");
});

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
