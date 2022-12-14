const { ResponseCode } = require("../../constants");

class ApiResponse {
  responseCode = ResponseCode.UnknownError;

  code(code) {
    this.responseCode = code;
    return this;
  }

  data(data) {
    return {
      code: this.responseCode,
      data
    };
  }  
}

class ApiResponseMaker {
  static code(...args) {
    const newApiResponse = new ApiResponse();
    newApiResponse.code(...args);
    return newApiResponse;
  }
}

module.exports = {
  ApiResponse: ApiResponseMaker
};