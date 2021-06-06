/* eslint-disable class-methods-use-this */
const AuthService = require("../services/authService");
const Responses = require("../utils/response");

class AuthController {
  async userSignup(req, res) {
    const result = await AuthService.signup(req.body);
    const {
      status, error, message, data
    } = result;
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }

  async userLogin(req, res) {
    const result = await AuthService.login(req.body);
    const {
      status, error, message, data
    } = result;
    if (status) {
      res.status(200).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }
}

module.exports = new AuthController();
