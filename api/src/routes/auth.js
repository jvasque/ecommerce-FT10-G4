
const server = require("express").Router();
const { User } = require("../db.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const googleLogin = require("./auth/googleLogin.js");
const me = require("./auth/me.js");
const login = require("./auth/login.js");
const express = require("express");
const adminResetPassword = require("./auth/adminResetPassword.js");
const postPassword = require("./auth/postPassword.js");
const nodemailer = require("nodemailer");
const resetPassword = require("./auth/resetPassword.js");

const { SECRET_KEY, GOOGLE_CONSUMER_KEY, CLIENT_ID_FB } = process.env;
const { OAuth2Client } = require("google-auth-library");
const axios = require('axios')
const fetch = require('node-fetch');
const facebookLogin = require("./auth/facebookLogin.js");
const client = new OAuth2Client(

    GOOGLE_CONSUMER_KEY,
    CLIENT_ID_FB
  );
// Middlewares
server.use(express.json());

// User routes

server.get("/me", me);
server.post("/login", login);
server.post("/google/login", googleLogin);
server.post("/facebook/login", facebookLogin);
server.get(
  "/password/reset/:id",
  passport.authenticate("bearer", { session: false }),
  adminResetPassword
);

server.post(
  "/reset",
  passport.authenticate("bearer", { session: false }),
  postPassword
);


server.post("/forgot/email", resetPassword );

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
server.get("/facebook", passport.authenticate("facebook"));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
server.get(

  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/user/info',
    failureRedirect: 'http://localhost:3000/user/login',

    session: false,
  })
);


module.exports = server;
