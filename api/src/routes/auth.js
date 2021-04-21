const server = require("express").Router();
const { User } = require("../db.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { SECRET_KEY } = process.env;

const client = new OAuth2Client(
  "926134963488-27qle0uk3423ed3dt2jlkd20rtht66g6.apps.googleusercontent.com"
);

server.get("/me", async (req, res, next) => {
  try {
    if (req.user) {
      const { id } = req.user;
      const result = await User.findByPk(id);
      res.json(result);
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});

server.post("/login", function (req, res, next) {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, message) {
      if (err) return next(err);
      else if (!user) return res.sendStatus(401);
      else return res.send(jwt.sign(user, SECRET_KEY));
    }
  )(req, res, next);
});

server.post("/google/login", async (req, res) => {
  // const { tokenId } = req.body;
  (console.log(req.user))
  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience:
        "926134963488-27qle0uk3423ed3dt2jlkd20rtht66g6.apps.googleusercontent.com",
    });
    console.log(response)
    const {
      email_verified,
      sub,
      given_name,
      family_name,
      email,
      picture,
    } = response.payload;
    if (email_verified) {
      const find = await User.findOne({
        where: {
          email: email,
        },
      });
      if (find) {
        if (!find.firstName) await find.update({ firstName: given_name });
        if (!find.lastName) await find.update({ lastName: family_name });
        if (!find.googleId) await find.update({ googleId: sub });
        if (!find.photoURL) await find.update({ photoURL: picture });
        console.log(find.toJSON());
        res.json(find);
      } else {
        
        const newUser = User.Create({
          firstName: given_name,
          lastName: family_name,
          email: email,
          googleId: sub,
          photoURL: picture
        });
        res.json(newUser)
      }
    } else {
      res.status(401).json({message: "email no verificado"})
    }
  } catch (e) {
    console.log(e);
  }
});

// server.get(
//   "/google",

//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// server.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "http://localhost:3000/user/login",
//     session: false,
//   }),
//   function (req, res) {
//     console.log(req.user);
//     // res.json(req.user)
//     res.redirect("http://localhost:3001/auth/me");
//     // res.json(req.user)
//   }
// );

module.exports = server;
