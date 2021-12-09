const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get("/bestsellers", (req, res) => {
  res.send({
    bestsellers: [
      {
        id: 1,
        name: "개발자되기책",
        price: 27000,
        seller: "송은",
      },
      {
        id: 2,
        name: "개발자되기책",
        price: 27000,
        seller: "송은",
      },
      {
        id: 3,
        name: "개발자되기책",
        price: 27000,
        seller: "송은",
      },
      {
        id: 4,
        name: "개발자되기책",
        price: 27000,
        seller: "송은",
      },
      {
        id: 5,
        name: "개발자되기책",
        price: 27000,
        seller: "송은",
      },
    ],
  });
});

app.get("/books", (req, res) => {
  res.send({
    books: [
      {
        id: 1,
        name: "개발자되기책",
        price: 27000,
        seller: "송은",
      },
      {
        id: 2,
        name: "개발자되기책",
        price: 27000,
        seller: "송은",
      },
      {
        id: 3,
        name: "개발자되기책",
        price: 27000,
        seller: "송은",
      },
      {
        id: 4,
        name: "개발자되기책",
        price: 27000,
        seller: "송은",
      },
      {
        id: 5,
        name: "개발자되기책",
        price: 27000,
        seller: "송은",
      },
    ],
  });
});

app.post("/test", (req, res) => {
  const body = req.body;
  res.send("상품이 업로드 되었습니다");
});

app.listen(port, () => {
  console.log(`서버가 돌아갑니다`);
});
