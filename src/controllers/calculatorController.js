/* eslint-disable class-methods-use-this */
const calculatorService = require("../services/calculatorService");
const Responses = require("../utils/response");

class CalculatorController {
  async calculateArea(req, res) {
    console.log(req.body);
    const result = await calculatorService.calculater(req.body);
    const {
      status, error, message, data
    } = result;
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }
}

module.exports = new CalculatorController();
