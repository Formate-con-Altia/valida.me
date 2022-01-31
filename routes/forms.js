const express = require("express");
const formController = require("../controllers/formController");

const router = express.Router();

router.get("/", formController.createForm);
router.post("/create", formController.createNewForm);
router.get("/:id", formController.getCreatedForm);

module.exports = router;
