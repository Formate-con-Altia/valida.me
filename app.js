require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(morgan("dev"));

app.use((req, res) => res.status(404).send("Recurso no encontrado"));

try {
  // Iniciamos la app en el puerto definido
  app.listen(PORT);
  console.log(`> Servidor escuchando en http://localhost:${PORT}`);
} catch (error) {
  console.error(error);
  process.exit();
}
