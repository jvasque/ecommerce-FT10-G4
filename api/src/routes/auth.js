const server = require("express").Router();
const { User } = require("../db.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

server.get("/me", async (req, res, next) => {
  try {
    if (req.user) {
      const { id } = req.user;
      const result = await User.findByPk(id);
      //hacer verificacion por email
      res.json(result);
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});

server.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user) {
    if (err) return next(err);
    else if (!user) return res.sendStatus(401);
    else return res.send(jwt.sign(user, SECRET_KEY));
  })(req, res, next);
});

module.exports = server;

// server.post("/login", (req, res, next) => {
//     passport.authenticate("local", { session: false }, (err, user) => {
//       if (user) {
//         const token = jwt.sign({ user }, "secreto");
//         res.status(200).json({ user, token });
//       } else {
//         res.status(402).send("funca, no funca");
//       }
//     })(req, res, next);
//   });
