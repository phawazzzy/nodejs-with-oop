/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

const { BadRequest, InternalServerError } = require("http-errors");
const Calculater = require("../helpers/calculate");
const Calculations = require("../models/calculations");

class CalculatorService {
  // service to carry out the business logic for the when the endpoint calculate is hit
  async calculater(payload, user) {
    try {
      // gets the payload from the body
      const { shape, dimensions } = payload;
      // change the shape letter case to lowercase
      const filteredShape = shape.toLowerCase();
      // creates new shape instance
      const area = new Calculater(filteredShape, dimensions);
      // call the validateDimension function in the Shape class
      // handles the calculation and payload validation for shape
      const makeCalculation = area.validateDimension();
      if (makeCalculation.message !== "") {
        throw BadRequest(makeCalculation.message);
      }
      // save the calculation into the database
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

  // handles the business logic to retrieve all the calculation a user has mad
  async previousCalculation(user) {
    try {
      // query the Database for all calculations specific to the logged in user
      const previousCalculation = await Calculations.find({ user: user.userId }, { __v: 0 })
        .populate("user", "username");
      if (!previousCalculation) {
        throw InternalServerError("Server error");
      }
      // check if user has not made any calculation
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
          calculation_details: {
            shape: docs.shape,
            dimensions: docs.dimensions,
            formula: docs.formula,
            calculation: docs.calculation,
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

// export the class
module.exports = new CalculatorService();
