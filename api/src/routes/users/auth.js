const router = require("express").Router();
const { User } = require("../../db.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/me", async (req, res, next) => {
  try {
    const { id } = req.user;
    const result = await User.findByPk(id);
    //hacer verificacion por email
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user) {
    if (err) return next(err);
    else if (!user) return res.sendStatus(401);
    else return res.send(jwt.sign(user, "secreto"));
  })(req, res, next);
});

module.exports = router;

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
