const express = require("express");
const { signupValidation, loginValidation } = require("../helpers/validationSchema");
const { validator } = require("../middlewares/validationMid");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", validator(signupValidation), AuthController.userSignup);
router.post("/login", validator(loginValidation), AuthController.userLogin);

module.exports = router;
