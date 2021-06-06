/* eslint-disable camelcase */
const { BadRequest } = require("http-errors");

class Shape {
  constructor(shape, dimensions) {
    this.shape = shape;
    this.dimensions = dimensions;
    this.area = 0;
    this.message = "";
  }

  validateDimension() {
    switch (this.shape) {
      case "Square":
        this.calculateSquare();
        break;
      case "Rectangle":
        this.calculateRectangle();
        break;
      case "Triangle":
        this.calculateTriangele();
        break;
      case "Circle":
        this.calculateCircle();
        break;
      default:
        this.unsupportedShape();
        // break;
    }
    return this;
  }

  calculateSquare() {
    if (Object.keys(this.dimensions).length !== 1) {
      throw BadRequest("invalid parameters for a square");
    }
    if (!this.dimensions.side || this.dimensions.side === "") {
      throw BadRequest("square data not complete");
    }
    this.area = this.dimensions.side * this.dimensions.side;
    return this.area;
  }

  calculateRectangle() {
    if (Object.keys(this.dimensions).length < 2 || Object.keys(this.dimensions).length > 2) {
      throw BadRequest("Invalid parameters for a rectangle, provide only length and breadth");
    }
    if (!this.dimensions.length || !this.dimensions.breadth) {
      throw BadRequest("rectangle data is not complete, provide only length and breadth");
    }
    this.area = this.dimensions.length * this.dimensions.breadth;
    return this.area;
  }

  calculateTriangele() {
    if (Object.keys(this.dimensions).length !== 3) {
      throw BadRequest("Invalid parameters for a triangle, provide only length_a, length_a and length_c");
    }
    const { length_a, length_b, length_c } = this.dimensions;
    if (!length_a || !length_b || !length_c) {
      throw BadRequest("triangle data is not complete");
    }
    const s = (length_a + length_b + length_c) / 2;
    const X = ((s - length_a) * (s - length_b) * (s - length_c));
    const area = Math.sqrt(X);
    this.area = area;
    return this.area;
  }

  calculateCircle() {
    if (Object.keys(this.dimensions).length !== 1) {
      throw BadRequest("Invalid parameters for a circle, provide only radius");
    }
    if (!this.dimensions.radius) {
      throw BadRequest("circle data is not complete");
    }
    const area = (Math.PI * this.dimensions.radius) ** 2;
    this.area = area;
    return this.area;
  }

  // eslint-disable-next-line class-methods-use-this
  unsupportedShape() {
    this.message = "This shape isnt supported";
    return this.message;
  }
}

module.exports = Shape;

// const square = new Shape("Square", { side: 4 });
// const rectangle = new Shape("Rectangle", { length: 4, breadth: 4 });
// const traingle = new Shape("Triangle", {
//   length_a: 3,
//   length_b: 4,
//   length_c: 5
// });
// const circle = new Shape("Circle", { radius: 4 });

// switch (shape) {
//   case "Square":
//     square.calculateSquare();
//     break;
//   case "Rectangle":
//     rectangle.calculateRectangle();
//   case "traingle":
//     traingleFunction;
//   case "circle":
//     circleFunction;
//   default:
//     nothingToShowFunction;
//     break;
// }
