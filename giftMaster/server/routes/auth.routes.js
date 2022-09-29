const router = require("express").Router();
const express = require("express")
// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;
const { isAuthenticated } = require('../middleware/jwt.middleware');

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// POST /auth/signup - Creates a new user in the database
router.post("/signup", (req, res) => {
  const { email, password, firstName, lastName, birthday, religion } = req.body;

  if (email === '' || password === '' || firstName === '' || lastName === '' || birthday === '' || religion === '') {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your email, password, firstName, lastName, birthday and religion." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ errorMessage: "Your password needs to be at least 6 characters long.", });
  }

  //   ! This use case is using a regular expression to control for special characters and min length
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    return res
      .status(400)
      .json({ errorMessage: "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",});
  }

  // Search the database for a user with the email submitted in the form
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then` 
      return User.create({ email, password: hashedPassword, firstName, lastName });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, firstName, lastName, _id } = createdUser;
    
      // Create a new object that doesn't expose the password
      const user = { email, firstName, lastName, _id };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" })
    });
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string 
  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
    
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." })
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, firstName } = foundUser;
        
        // Create an object that will be set as the token payload
        const payload = { _id, email, firstName };

        // Create and sign the token
        const authToken = jwt.sign( 
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        );

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }

    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});


module.exports = router;
