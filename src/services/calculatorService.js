/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

const { BadRequest } = require("http-errors");
const Calculater = require("../helpers/calculate");

class CalculatorService {
  async calculater(payload) {
    try {
      const { shape, dimensions } = payload;
      const area = new Calculater(shape, dimensions);
      const makeCalculation = area.validateDimension();
      if (makeCalculation.message !== "") {
        throw BadRequest(makeCalculation.message);
      }
      return {
        status: true,
        data: {
          shape,
          area: makeCalculation.area
        },
        message: "Succesfully calculated shape",
        error: null
      };
    } catch (error) {
      return {
        status: false,
        data: null,
        message: error.message,
        error
      };
    }
  }
}

module.exports = new CalculatorService();
