const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require("./db.js");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { SECRET_KEY, CLIENT_SECRET,URL, CLIENT_ID, GOOGLE_CONSUMER_KEY, GOOGLE_CONSUMER_SECRET, GOOGLE_URL_CB } = process.env;

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
      
      if(status === 'banned') return done(null, false)
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

// passport.use(new FacebookStrategy({
//   clientID: CLIENT_ID,
//   clientSecret: CLIENT_SECRET,
//   callbackURL: URL
// },
//  function(accessToken, refreshToken, profile, done) {
//   console.log(profile)
//     const user = User.findOne({ where: { facebookUser: profile.id } });
// }
// ));

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CONSUMER_KEY,
  clientSecret: GOOGLE_CONSUMER_SECRET,
  // followRedirects: true,
      // requestTokenURL: "https://accounts.google.com/OAuthGetRequestToken",
  callbackURL: GOOGLE_URL_CB
},

    // User.findOne({where: {email: profile.emails[0].value} }, function (err, user) {
    //   return done(err, user);
    // });
    // console.log(accessToken);
    // console.log(profile);
   async (acessToken, refreshToken, profile, cb) => {
console.log(await User.findOne({where:{ email: profile.emails[0].value}}))
      User.findOne({email:profile.emails[0].value}, (err, user) => { // find the user
      console.log(user)
      // if the 'user' array is empty (meaning no users were found)
        if (!user.length) {
          
          // creates a user with the accessToken given by Google,
          // the google account id and displayName stored in the 
          // profile argument 
          User.create({
            accessToken,
            googleId: profile.id,
            name: profile.displayName,
          }, (err, user) => {
            return cb(err, user);
          });
        }
        
        return cb(err, user);
      });
    }
    // return cb(null, profile)
//  await User.findOne({where:{ email: profile.emails[0].value}},function (err, user) {
//       return cb(err, user);
//     })
  // await user.update({googleId:profile.id})
  // await user.update({registrationToken:accessToken})
  // console.log(user)
    // console.log(profile);
    // console.log(profile.emails[0].value);
    // return cb(null, user)

));


module.exports = passport;
