/* eslint-disable class-methods-use-this */
const CalculatorService = require("../services/calculatorService");
const Responses = require("../utils/response");

class CalculatorController {
  async calculateArea(req, res) {
    const result = await CalculatorService.calculater(req.body, res.locals.user);
    const {
      status, error, message, data
    } = result;
    if (status) {
      res.status(200).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }

  async getCalculations(req, res) {
    const result = await CalculatorService.previousCalculation(res.locals.user);
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

module.exports = new CalculatorController();
