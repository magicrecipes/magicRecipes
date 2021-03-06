require("dotenv").config();
const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.LOCAL_URL}auth/google/callback`
    },
    (accessToken, refreshToken, profile, done) => {
      // to see the structure of the data in received response:
      User.findOne({ googleID: profile.id })
        .then(user => {
          if (user) {
            done(null, user);
            return;
          }

          User.create({
            googleID: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            active: true,
            recipes:[]
          })
            .then(newUser => {
              done(null, newUser);
            })
            .catch(err => done(err)); // closes User.create()
        })
        .catch(err => done(err)); // closes User.findOne()
    }
  )
);
