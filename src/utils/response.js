/* eslint-disable class-methods-use-this */
class Responses {
  successResponse(message, data) {
    return {
      status: true,
      message,
      data,
      error: null
    };
  }

  errorResponse(error) {
    return {
      status: false,
      message: error.message,
      data: null,
      error
    };
  }
}

module.exports = new Responses();
