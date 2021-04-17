const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require("./db.js");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, CLIENT_SECRET,URL, CLIENT_ID } = process.env;

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {
      const user = await User.findOne({ where: { email: email } });
      if (!user || !user.correctPassword(password)) return done(null, false);
      const {
        id,
        firstName,
        lastName,
        email: userEmail,
        photoURL,
        type,
      } = user;
      return done(null, {
        id,
        firstName,
        lastName,
        email: userEmail,
        photoURL,
        type,
      });
    }
  )
);

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, SECRET_KEY, function (err, user) {
      if (err) return done(err);
      return done(null, user ? user : false);
    });
  })
);

passport.use(new FacebookStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: URL
},
 function(accessToken, refreshToken, profile, done) {
  console.log(profile)
    const user = User.findOne({ where: { facebookUser: profile.id } });
}
));



module.exports = passport;
