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
    async (accessToken, refreshToken, profile, done) => {
      const id = profile.id;
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const profilePhoto = profile.photos[0].value;

      const currentUser = await User.findOne({ email });

      // Creamos un nuevo usuario
      if (!currentUser) {
        const newUser = await new User({
          id,
          email,
          firstName,
          lastName,
          profilePhoto,
          source: "google",
        }).save();

        return done(null, newUser);
      }

      // El usuario ha sido registrado utilizando otro método de autenticación
      if (currentUser.source !== "google") {
        return done(null, false, { message: "Tu cuenta ya está registrada." });
      }

      // Devolvemos el usuario existente
      return done(null, currentUser);
    }
  )
);
