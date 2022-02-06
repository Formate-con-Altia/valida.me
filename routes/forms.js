const express = require("express");
const formController = require("../controllers/formController");
const { isNotAuthenticated } = require("../lib/auth");

const router = express.Router();

router.get("/", isNotAuthenticated, formController.createForm);
router.post("/create", isNotAuthenticated, formController.createNewForm);
router.post("/formResponse", formController.createResponse);
router.get("/list", isNotAuthenticated, formController.showForms);
router.get(
  "/:id/responses/json",
  isNotAuthenticated,
  formController.showResponses
);
router.get("/:id/responses", isNotAuthenticated, formController.getResponses);
router.get("/:id", formController.getCreatedForm);

module.exports = router;
