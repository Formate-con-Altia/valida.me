const passport = require("passport");
const userModel = require("../models/user");
const passportStrategy = require("passport-local").Strategy;

passport.use(
  "local-signup",
  new passportStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const emailFind = await userModel.findOne({ email });
      if (emailFind) return done(null, false);
      const newUser = new userModel({ email, password });
      await newUser.save();
      return done(null, newUser);
    }
  )
);
