const express = require("express");
const formController = require("../controllers/formController");

const router = express.Router();

router.get("/", formController.createForm);
router.post("/create", formController.createNewForm);
router.post("/formResponse", formController.createResponse);
router.get("/list",formController.showForms);
router.get("/responses/:id/data",formController.showResponses)
router.get("/responses/:id", formController.getResponses)
router.get("/:id", formController.getCreatedForm);


module.exports = router;
