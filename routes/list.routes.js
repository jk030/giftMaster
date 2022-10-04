// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const Recipient = require("../models/Recipient")

// //  POST /api/lists  -  Creates a new list
// router.post("/list/:recipientId", (req, res, next) => {
//     const { name, personalDetails, userId, picturePerson, occasion, preference, unwanted, priceSpan, imageGift, title, link, notes } = req.body;
  
//     Recipient.create({name, personalDetails, user: userId, picturePerson, occasion, preference, unwanted, priceSpan, imageGift, title, link, notes})
//       .then(newRecipient => {
//         return Recipient.findByIdAndUpdate(userId, { $push: { lists: newRecipient._id } } );
//       })
//       .then((response) => res.json(response))
//       .catch((err) => res.json(err));
// });

// router.get("/list/:recipientId", (req, res, next) => {
//   const { userId } = req.params;
//     User.findById(userId)
//       .populate("recipient")
//       .then((allDetails) => res.json(allDetails))
//       .catch((err) => res.json(err));
// });
  



// module.exports = router;

// // changed the wording with Marco --> Recipient makes more sense, because with this route we create a new Recipient, not a list 
// // + the route is wrong - see figma to see the name // it should be /addRecipient
// // TODO: receiving null as a response after attempting to create list assigned to user