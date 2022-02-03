require("dotenv").config();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      //({ googleId: profile.id });
      const emailFound = await User.findOne({ email });

      if (emailFound) return done(null, false);

      const newUser = await new User({
        email,
        password,
        source: "google",
      }).save();

      return done(null, newUser);
    }
  )
);
