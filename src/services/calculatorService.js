/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

const { BadRequest, InternalServerError } = require("http-errors");
const Calculater = require("../helpers/calculate");
const Calculations = require("../models/calculations");

class CalculatorService {
  async calculater(payload, user) {
    try {
      const { shape, dimensions } = payload;
      const area = new Calculater(shape, dimensions);
      const makeCalculation = area.validateDimension();
      if (makeCalculation.message !== "") {
        throw BadRequest(makeCalculation.message);
      }
      const calculation = await Calculations.create({
        user: user.userId,
        shape,
        dimensions,
        calculation: makeCalculation.calculation,
        formula: makeCalculation.formula,
        area: makeCalculation.area
      });

      if (!calculation) {
        throw InternalServerError("Server error");
      }
      return {
        status: true,
        data: {
          calculation
        },
        message: "Succesfully calculated area of the shape",
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

  async previousCalculation(user) {
    try {
      const previousCalculation = await Calculations.find({ user: user.userId }, { __v: 0 })
        .populate("user", "username");
      if (!previousCalculation) {
        throw InternalServerError("Server error");
      }

      if (previousCalculation.length < 1) {
        return {
          status: true,
          data: [],
          message: "This user has not made any calculations",
          error: null
        };
      }
      return {
        status: true,
        data: previousCalculation.map((docs) => ({
          calculationId: docs._id,
          user: {
            userId: docs.user._id,
            username: docs.user.username
          },
          calculation: {
            shape: docs.shape,
            dimensions: docs.dimensions,
            area: docs.area
          }
        })),
        message: "Successfull fetched user's calculations",
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
