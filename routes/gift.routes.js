const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Recipient = require("../models/Recipient.model");
const Gift = require("../models/Gift.model");

//  POST /api/gifts  -  Creates a new gift
router.post("/gifts", (req, res, next) => {
    const { recipientId, occasion, priceSpan, imageGift, title, link, notes } = req.body;
  
    Gift.create({ recipient: recipientId, occasion, priceSpan, imageGift, title, link, notes})
      .then(newGift => {
         Gift.findByIdAndUpdate(recipientId, { $push: { gifts: newGift._id } } );
         res.json(newGift)
      })
      .catch((err) => res.json(err));
});

module.exports = router;