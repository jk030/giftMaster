const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const GiftList = require("../models/GiftListModel")

//  POST /api/lists  -  Creates a new list
router.post("/lists", (req, res, next) => {
    const { name, personalDetails, picturePerson, occasion, preference, unwanted, priceSpan, imageGift, title, link, notes  } = req.body;
  
    GiftList.create({name, personalDetails, picturePerson, occasion, preference, unwanted, priceSpan, imageGift, title, link, notes})
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
});

module.exports = router;