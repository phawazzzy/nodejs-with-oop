const Joi = require("@hapi/joi");

const signupValidation = Joi.object().keys({
    email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email")
        .required(),
    password: Joi.string().trim().min(2).label("password")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;])(?=.{8,})/, "required password strength")
        .required(),
    username: Joi.string().trim().min(2).label("user name")
        .required(),
});

module.exports = { signupValidation };