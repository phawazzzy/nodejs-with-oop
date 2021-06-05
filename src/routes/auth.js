const express = require("express");
const { signupValidation } = require("../helpers/validationSchema");
const { validator }  = require("../middlewares/validationMid");
const AuthController = require("../controllers/authController")


const router = express.Router();

router.post("/signup", validator(signupValidation), AuthController.userSignup);

module.exports = router;
