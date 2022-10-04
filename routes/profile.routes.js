const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model")







router.get("/profilePage/:userId", (req, res, next) => {
  const { userId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     res.status(400).json({ message: 'Specified id is not valid' })
//     return;
//   }

    User.findById(userId)
      .populate("recipient")
      .then((allDetails) => res.json(allDetails))
      .catch((err) => res.json(err));
});
  
  module.exports = router;

