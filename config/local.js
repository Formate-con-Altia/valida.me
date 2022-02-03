const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const userFound = await User.findOne({ email });

      if (userFound) return done(null, false);

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await new User({
        email,
        password: hashedPassword,
        source: "local",
      }).save();

      return done(null, newUser);
    }
  )
);

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const currentUser = await User.findOne({ email });

      // Usuario no encontrado
      if (!currentUser) {
        return done(null, false);
      }

      // Tipo de cuenta incorrecta
      if (currentUser.source !== "local") {
        return done(null, false);
      }

      // Datos de login incorrectos
      if (!bcrypt.compareSync(password, currentUser.password)) {
        return done(null, false);
      }

      return done(null, currentUser);
    }
  )
);
