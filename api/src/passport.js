const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./db.js");

passport.use(
  new LocalStrategy(
    
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {      
      const user = await User.findOne({ where: { email: email } });
      if (!user || !user.correctPassword(password)) return done(null, false);
      const { firstName, lastName, email: userEmail, photoURL, isAdmin } = user;
      return done(null, {
        firstName,
        lastName,
        email,
        photoURL,
        isAdmin,
      });
    }
  )
);

module.exports = passport;
