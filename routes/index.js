const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const members = [
    {
      name: "Adrián González",
      github: "AdrianGonzalezFilgueira",
      image: "https://avatars.githubusercontent.com/u/96414207?v=4",
    },
    {
      name: "Adrián Rey",
      github: "arlomba",
      image: "https://avatars.githubusercontent.com/u/25609171?v=4",
    },
    {
      name: "Ángel Amado",
      github: "angel-amado",
      image: "https://avatars.githubusercontent.com/u/93152011?v=4",
    },
    {
      name: "David Gómez",
      github: "davidgomezfrieiro",
      image: "https://avatars.githubusercontent.com/u/96413703?v=4",
    },
    {
      name: "David Pérez",
      github: "k87c",
      image: "https://avatars.githubusercontent.com/u/87193204?v=4",
    },
    {
      name: "João Silva",
      github: "JFSilvaM",
      image: "https://avatars.githubusercontent.com/u/96413978?v=4",
    },
    {
      name: "María Gabriela Hernández",
      github: "gabihersan988",
      image: "https://avatars.githubusercontent.com/u/96473941?v=4",
    },
  ];

  res.render("index", { flash: req.flash("success"), members });
});

module.exports = router;
