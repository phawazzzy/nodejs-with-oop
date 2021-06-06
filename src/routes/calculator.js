const express = require("express");

const router = express.Router();

const CalculatorController = require("../controllers/calculatorController");
const { mustBeLoggedIn } = require("../helpers/authHelpers");
const { shapeValidation } = require("../helpers/validationSchema");
const { validator } = require("../middlewares/validationMid");

router.post("/", validator(shapeValidation), mustBeLoggedIn, CalculatorController.calculateArea);

module.exports = router;
