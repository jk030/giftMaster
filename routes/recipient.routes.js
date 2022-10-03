const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Recipient = require("../models/Recipient.model")
const User = require("../models/User.model")

//  POST /api/recipients  -  Creates a new recipient
router.post("/recipients", (req, res, next) => {
    const { name, personalDetails, userId, imageRecipient, preference, unwanted } = req.body;
  
    Recipient.create({name, personalDetails, user: userId, imageRecipient, preference, unwanted })
      .then(newRecipient => {
         Recipient.findByIdAndUpdate(userId, { $push: { recipients: newRecipient._id } } );
         res.json(newRecipient)
      })
      .catch((err) => res.json(err));
});

// GET /api/recipients - Retrieves all the recipients
router.get('/recipients', (req, res, next) => {
  Recipient.find()
    .then((allRecipients) => res.json(allRecipients))
    .catch((err) => res.json(err))
});

// GET /api/recipients/:recipientId - Retrieves a specific recipient by id
router.get('/recipients/:recipientId', (req, res, next) => {
  const { recipientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipientId)) {
    res.status(400).json({ message: 'Specified id is not valid' })
    return;
  }
  Recipient.findById(recipientId)
    .then(recipient => res.status(200).json(recipient))
    .catch(error => res.json(error));
});

// PUT  /api/recipients/:recipientId  -  Updates a specific recipient by id
router.put('/recipients/:recipientId', (req, res, next) => {
  const { recipientId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(recipientId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Recipient.findByIdAndUpdate(recipientId, req.body, { new: true })
    .then((updatedRecipient) => res.json(updatedRecipient))
    .catch(error => res.json(error));
});

// DELETE  /api/recipients/:recipientId  -  Deletes a specific recipient by id
router.delete('/recipients/:recipientId', (req, res, next) => {
  const { recipientId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(recipientId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Recipient.findByIdAndRemove(recipientId)
    .then(() => res.json({ message: `Recipient with ${recipientId} is removed successfully.` }))
    .catch(error => res.json(error));
});

module.exports = router;
