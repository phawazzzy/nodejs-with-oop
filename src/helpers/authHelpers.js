/* eslint-disable class-methods-use-this */
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");

class AuthHelpers {
  // constructor(user) {
  //     this.user = user
  // }

  // handles password hacshing using bcrypt
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

  // handles token generation
  async generateToken(payload) {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    return JWT.sign(payload, secret, { expiresIn: "6h" });
  }

  // handles check for a password validity by comparing the
  // hash with the provided plain password
  async isPasswordValid(hashedPass, plainPass) {
    return bcrypt.compareSync(plainPass, hashedPass);
  }

  // handles user's authorization
  mustBeLoggedIn(req, res, next) {
    // grab the token from the header
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw Unauthorized("unauthorized access: Token not found");
      }
      // check if it is bearee token
      if (!token.split(" ")[0]) {
        throw Unauthorized("invalid token type: provide a Bearer token");
      }
      // get the plain token removing the bearer
      const authToken = req.headers.authorization.split(" ")[1];

      // try {
      req.apiUser = JWT.verify(authToken, process.env.ACCESS_TOKEN_SECRET);

      // res.locals is guaranteed to hold state over the life of a request.
      res.locals.user = req.apiUser;

      next();
    } catch (error) {
      res.status(error.status || 500).json({
        status: false,
        message: "Sorry, you must provide a valid token.",
        error
      });
    }
  }
}

module.exports = new AuthHelpers();
