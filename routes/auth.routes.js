const router = require("express").Router();
const express = require("express")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const saltRounds = 10;
const { isAuthenticated } = require('../middleware/jwt.middleware');
const User = require("../models/User.model");

// POST /auth/signup - Creates a new user in the database

router.post("/signup", (req, res) => {
  const { email, password, userName } = req.body;
  //console.log(req.body)

  if (email === '' || password === '' || userName === '') {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your email, password, userName" });
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
      .json({ errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",});
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
      return User.create({ email, password: hashedPassword, userName });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, userName, _id } = createdUser;
      console.log(createdUser)
    
      // Create a new object that doesn't expose the password
      const user = { email, userName, _id };

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
      console.log(passwordCorrect)
      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email } = foundUser;
        
        // Create an object that will be set as the token payload
        const payload = { _id, email };
        console.log(payload)
        console.log(process.env.TOKEN_SECRET)
        // Create and sign the token
        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256' }
        );
        
          console.log('authToken', authToken);
        // Send the token as the response
        res.status(200).json({ authToken: authToken, userId: _id });
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }

    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get('/verify', isAuthenticated, (req, res, next) => {       // <== CREATE NEW ROUTE
 
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);
 
  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});

module.exports = router;
