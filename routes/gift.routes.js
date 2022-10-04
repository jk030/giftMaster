const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Recipient = require("../models/Recipient.model")
const Gift = require("../models/Gift.model")

//  POST /api/gifts  -  Creates a new gift
router.post("/gifts", (req, res, next) => {
    const { title, priceSpan, occasion, imageGift, link, notes, recipientId  } = req.body;
  
    Gift.create({ title, priceSpan, occasion, imageGift, link, notes, recipient: recipientId})
      .then(newGift => {
        console.log('newGift',newGift)
        return Recipient.findByIdAndUpdate(recipientId, { $push: { gifts: newGift._id } }, {new: true} )
        .then( updatedRecipient => {
          console.log('updatedRecipient', updatedRecipient)
          res.json(updatedRecipient)
         })
      })
      .catch((err) => res.json(err));
});


// GET /api/gifts - Retrieves all the gifts
router.get('/gifts', (req, res, next) => {
    Gift.find()
      .populate("recipient")
      .then((allGifts) => res.json(allGifts))
      .catch((err) => res.json(err))
});

// GET /api/gifts/:giftId - Retrieves a specific gift by id
router.get('/gifts/:giftId', (req, res, next) => {
    const { giftId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(giftId)) {
      res.status(400).json({ message: 'Specified id is not valid' })
      return;
    }
    Gift.findById(giftId)
      .then(gift => res.status(200).json(gift))
      .catch(error => res.json(error));
});

// PUT  /api/gifts/:giftId  -  Updates a specific gift by id
router.put('/gifts/:giftId', (req, res, next) => {
    const { giftId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(giftId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Gift.findByIdAndUpdate(giftId, req.body, { new: true })
      .then((updatedGift) => res.json(updatedGift))
      .catch(error => res.json(error));
});

// DELETE  /api/gifts/:giftId  -  Deletes a specific gift by id
router.delete('/gifts/:giftId', (req, res, next) => {
    const { giftId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(giftId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Gift.findByIdAndRemove(giftId)
      .then(() => res.json({ message: `Gift with ${giftId} is removed successfully.` }))
      .catch(error => res.json(error));
});

module.exports = router;