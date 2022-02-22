const express = require("express");
const axios = require("axios");
const router = express.Router();
const models = require("../models");

const ALADIN_URL =
  "https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbwanamzz1755003&QueryType=Bestseller&MaxResults=5&start=1&SearchTarget=Book&Cover=Big&CategoryId=7396&output=js&Version=20131101";
const getBestSellers = async (request) => {
  let response;
  try {
    response = axios.get(ALADIN_URL);
  } catch (err) {
    console.log("/aladin API AXIOS ERROR");
  }
  return response;
};
router.get("/", (req, res) => {
  getBestSellers(req).then((result) => {
    res.json(result.data.item);
  });
});

module.exports = router;
