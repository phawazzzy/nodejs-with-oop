const Joi = require("@hapi/joi");

const signupValidation = Joi.object().keys({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email")
    .required(),
  password: Joi.string().trim().min(2).label("password")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;])(?=.{8,})/, "required password strength")
    .required(),
  username: Joi.string().trim().min(2).label("user name")
    .required()
});

const loginValidation = Joi.object().keys({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email")
    .required(),
  password: Joi.string().trim().label("password")
    .required()
});

// handles payload checks
// checks if shape and dimension is passed and it is valid datatypes
const shapeValidation = Joi.object().keys({
  shape: Joi.string().required(),
  dimensions: Joi.object().required()
});
module.exports = {
  signupValidation,
  loginValidation,
  shapeValidation
};
