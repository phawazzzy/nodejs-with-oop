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

const shapeValidation = Joi.object().keys({
  shape: Joi.string().required(),
  dimensions: Joi.object().required()
});

const rectangleVal = Joi.object().keys({
  length: Joi.number().required(),
  breadth: Joi.number().required()
});

const triangleVal = Joi.object().keys({
  length_a: Joi.number().required(),
  length_b: Joi.number().required(),
  length_c: Joi.number().required()
});

const circleVal = Joi.object().keys({
  radius: Joi.number().required()
});
module.exports = {
  signupValidation,
  loginValidation,
  shapeValidation,
  rectangleVal,
  triangleVal,
  circleVal
};
