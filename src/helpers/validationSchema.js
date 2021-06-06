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
  dimensions: Joi.object().keys({
    side: Joi.number(),
    length_a: Joi.number(),
    length_b: Joi.number(),
    length_c: Joi.number(),
    radius: Joi.number(),
    length: Joi.number(),
    breadth: Joi.number()
  })
});

module.exports = {
  signupValidation,
  loginValidation,
  shapeValidation
};
