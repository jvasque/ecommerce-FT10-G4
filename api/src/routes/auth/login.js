const passport = require("passport");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

module.exports = function (req, res, next) {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, message) {
      if (err) return next(err);
      else if (!user) return res.sendStatus(401).json(err);
      else return res.send(jwt.sign(user, SECRET_KEY));
    }
  )(req, res, next);
};
