require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const { globalVars } = require("./lib/auth");

const index = require("./routes/index");
const authRouter = require("./routes/auth");
const formsRoutes = require("./routes/forms");
const userRoutes = require("./routes/user");

require("./config/passport");
require("./config/local");
require("./config/google");

const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;
const MONGO_URI = process.env.MONGO_URI;

app.set("view engine", "ejs");
app.set("trust proxy", 1);

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    secret: "d1n0s3t0",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: NODE_ENV === "dev" ? false : true,
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(globalVars);

if (NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });
}

// Rutas de la aplicación
app.use(index);
app.use(authRouter);
app.use("/forms", formsRoutes);
app.use("/user", userRoutes);

app.use((req, res) => res.status(404).render("errors/404"));

try {
  mongoose.connect(MONGO_URI);
  app.listen(PORT);
  console.log(`> Servidor escuchando en http://localhost:${PORT}`);
} catch (error) {
  console.error(error);
  process.exit();
}
