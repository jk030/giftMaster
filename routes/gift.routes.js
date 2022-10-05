const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Recipient = require("../models/Recipient.model")
const Gift = require("../models/Gift.model")
const fileUploader = require("../config/cloudinary");

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageGift"), (req, res, next) => {
  console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});

//  POST /api/gifts  -  Creates a new gift
router.post("/gifts", (req, res, next) => {
    const { title, priceSpan, occasion, imageGift, link, notes, recipientId  } = req.body;
    console.log("req.body", req.body)

    Gift.create({ title, priceSpan, occasion, imageGift, link, notes, recipient: recipientId})
      .then(newGift => {
        console.log("hallo")
        console.log('newGift',newGift)
        return Recipient.findByIdAndUpdate(recipientId, { $push: { gifts: newGift._id } }, {new: true} )
      })
      .then( updatedRecipient => {
        console.log('updatedRecipient', updatedRecipient)
        res.json(updatedRecipient)
       })
      .catch((err) => res.json(err));
});


// GET /api/gifts - Retrieves all the gifts
router.get('/gifts', (req, res, next) => {
    Gift.find()
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
      .populate("recipient")
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