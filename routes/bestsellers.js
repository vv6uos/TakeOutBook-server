const express = require("express");
const axios = require("axios");
const router = express.Router();

const ALADIN_URL =
  "https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbwanamzz1755003&QueryType=Bestseller&MaxResults=5&start=1&SearchTarget=Book&Cover=Big&CategoryId=7396&output=js&Version=20131101";
const getBestSellers = async (request) => {
  let response;
  try {
    console.log("===>ALADIN API 베스트셀러 데이터 요청");
    response = axios.get(ALADIN_URL);
  } catch (err) {
    console.log("===>ALADIN API 베스트셀러 데이터 요청 실패");
  }
  return response;
};
router.get("/", (req, res) => {
  console.log(`>>>GET=BESTSELLERS REQUEST`);
  getBestSellers(req)
    .then((result) => {
      console.log("====>>BESTSELLERS 불러오기 성공");
      res.json({ answer: true, result: result.data.item });
    })
    .catch((err) => {
      console.log("====>>BESTSELLERS 불러오기 실패");
      res.json({
        answer: false,
      });
    });
});

module.exports = router;
