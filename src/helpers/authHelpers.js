/* eslint-disable class-methods-use-this */
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

class AuthHelpers {
  // constructor(user) {
  //     this.user = user
  // }

  async hashPassword(plainPassword) {
    // checks if there is password provided
    if (!plainPassword) {
      throw new Error("Error hashing password");
    }

    // salt round which bcrypt will use
    const salt = bcrypt.genSaltSync(10);

    // return the generated hashed string
    return bcrypt.hashSync(plainPassword, salt);
  }

  async generateToken(payload) {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    return JWT.sign(payload, secret, { expiresIn: "6h" });
  }

  async isPasswordValid(hashedPass, plainPass) {
    return bcrypt.compareSync(plainPass, hashedPass);
  }

  mustBeLoggedIn(req, res, next) {
    let token = req.headers["x-access-token"] || req.headers.authorization || req.body.token;
    if (token && token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }
    try {
      req.apiUser = JWT.verify(token, process.env.JWTSECRET);
      res.locals.user = req.apiUser;

      // res.locals is guaranteed to hold state over the life of a request.
      next();
    } catch (error) {
      res.status(401).json({
        status: false,
        message: "Sorry, you must provide a valid token."
      });
    }
  }
}

module.exports = new AuthHelpers();
