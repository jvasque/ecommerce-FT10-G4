const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;

const { User } = require("./db.js");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  SECRET_KEY,
  GOOGLE_CONSUMER_KEY,
  GOOGLE_CONSUMER_SECRET,
  GOOGLE_URL_CB,
} = process.env;

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
        status,
      } = user;
      if (status === "banned") return done(null, false);
      return done(null, {
        id,
        firstName,
        lastName,
        email: userEmail,
        photoURL,
        type,
        status,
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




passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CONSUMER_KEY,
      clientSecret: GOOGLE_CONSUMER_SECRET,
      callbackURL: GOOGLE_URL_CB,
    },

    async (accessToken, refreshToken, profile, cb) => {
      // console.log("profile", profile);

      //check if user already exists

      const find = await User.findOne({
        where: {
          email: profile.emails[0].value,
        },
      });

      await find.update({ googleId: profile.id });
      await find.update({ registrationToken: accessToken });
      console.log(find);
      const user = {
        id: find.dataValues.id,
        firstName: find.dataValues.firstName,
        lastName: find.dataValues.lastName,
        email: find.dataValues.email,
        type: find.dataValues.email,
        photoURL: find.dataValues.photoURL,
        status: find.dataValues.status,
        token: accessToken,
      };
      // console.log(find)
      return cb(null, user);
    }
  )
);

module.exports = passport;
