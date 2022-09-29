const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const GiftList = require("../models/GiftListModel")

//  POST /api/lists  -  Creates a new list
router.post("/lists", (req, res, next) => {
    const { name, personalDetails, userId, picturePerson, occasion, preference, unwanted, priceSpan, imageGift, title, link, notes } = req.body;
  
    GiftList.create({name, personalDetails, user: userId, picturePerson, occasion, preference, unwanted, priceSpan, imageGift, title, link, notes})
      .then(newList => {
        return GiftList.findByIdAndUpdate(userId, { $push: { lists: newList._id } } );
      })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
});

module.exports = router;

// TODO: receiving null as a response after attempting to create list assigned to user