const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('./db.js');
const jwt = require('jsonwebtoken');
const {
  SECRET_KEY,
  CLIENT_SECRET_FB,
  CLIENT_ID_FB,
  CALLBACK_URL_FB,
} = process.env;

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', session: false },
    async (email, password, done) => {
      const user = await User.findOne({ where: { email: email } });
      if (!user || !user.correctPassword(password)) return done(null, false);
      if (user.resetPassword) return done(null, false);
      const {
        id,
        firstName,
        lastName,
        email: userEmail,
        photoURL,
        type,
        status,
      } = user;
      if (status === "disabled") return done(null, false)
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
  new FacebookStrategy(
    {
      clientID: CLIENT_ID_FB,
      clientSecret: CLIENT_SECRET_FB,
      callbackURL: CALLBACK_URL_FB,
      profileFields: ['email', 'name'],
    },

    //     function (accessToken, refreshToken, profile, done) {
    //       console.log(profile);
    //       User.findOne(
    //         { where: { facebookUser: profile.id } },
    //         function (err, oldUser) {
    //           if (oldUser) {
    //             done(null, oldUser);
    //           } else {
    //             var newUser = new User({
    //               facebookUser: profile.id,
    //               email: profile.emails[0].value,
    //               type: 'user',
    //               firstName: profile.name.givenName,
    //               lastName: profile.name.familyName,
    //               password: 'Default@12#$',
    //             }).save(function (err, newUser) {
    //               if (err) throw err;
    //               done(null, newUser);
    //             });
    //           }
    //         }
    //       );
    //     }
    //   )
    // );
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);

      const newUser = await User.findOrCreate({
        where: {
          facebookUser: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          password: 'Default@12#$',
        },
      });
      done(err, newUser);
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

module.exports = passport;
