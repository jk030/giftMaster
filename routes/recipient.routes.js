const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Recipient = require("../models/Recipient")

//  POST /api/recipients  -  Creates a new recipient
router.post("/recipients", (req, res, next) => {
    const { name, personalDetails, userId, picturePerson, occasion, preference, unwanted, priceSpan, imageGift, title, link, notes } = req.body;
  
    Recipient.create({name, personalDetails, user: userId, picturePerson, occasion, preference, unwanted, priceSpan, imageGift, title, link, notes})
      .then(newRecipient => {
         Recipient.findByIdAndUpdate(userId, { $push: { recipients: newRecipient._id } } );
         res.json(newRecipient)
      })
      // .then(() => res.json(newRecipient))
      .catch((err) => res.json(err));
});

module.exports = router;

// changed the wording with Marco --> Recipient makes more sense, because with this route we create a new Recipient, not a list 
// + the route is wrong - see figma to see the name // it should be /addRecipient