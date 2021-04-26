const server = require("express").Router();
const { User } = require("../db.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const googleLogin = require("./auth/googleLogin.js");
const me = require("./auth/me.js");
const login = require("./auth/login.js");
const express = require("express");
const { SECRET_KEY} = process.env;

// Middlewares
server.use(express.json());

// User routes
server.get("/me", me);
server.post("/login", login);
server.post("/google/login", googleLogin);

server.post('/forgot', async (req, res, next) => {
  const {email} = req.body
  const user = await User.findOne({where:{email:email}})
  if(!user) return  res.status(401).json({message: "Usuario no encontrado"})
  const token = jwt.sign({id:user.id}, SECRET_KEY)
  
  res.json(token)
  

  // if (!user) {
  //  
    // return res.redirect('/forgot');
  // }
//logica de DB 
  // user.resetPasswordToken = token;
  // user.resetPasswordExpires = Date.now() + 3600000;

  // const resetEmail = {
  //   to: user.email,
  //   from: 'passwordreset@example.com',
  //   subject: 'Node.js Password Reset',
  //   text: `
  //     You are receiving this because you (or someone else) have requested the reset of the password for your account.
  //     Please click on the following link, or paste this into your browser to complete the process:
  //     http://${req.headers.host}/reset/${token}
  //     If you did not request this, please ignore this email and your password will remain unchanged.
  //   `,
  // };

  // await transport.sendMail(resetEmail);
  // req.flash('info', `An e-mail has been sent to ${user.email} with further instructions.`);

  // res.redirect('/forgot');
});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
server.get('/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
server.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/user/login',
    session: false,
  })
);

server.post('/forgot/reset',passport.authenticate('bearer', {session:false}), async (req,res)=>{
  
  const user = await User.findByPk(req.user.id)
  console.log(user)
  // se debe mirar la logica de DB
  res.send('ok')
})

module.exports = server;
