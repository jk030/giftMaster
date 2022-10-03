const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Recipient = require("../models/Recipient")
const User = require("../models/User.model")


router.get("/profilePage/:id", (req, res, next) => {
    Recipient.find()
      .then((allRecipients) => res.json(allRecipients))
      .catch((err) => res.json(err));
  });
  

  
  module.exports = router;
