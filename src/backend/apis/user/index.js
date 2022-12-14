const { API_ROOT_PATH } = require("../../../shared/constants");
const UsersController = require("./UsersController");

module.exports = (app) => {
  app.get(`${API_ROOT_PATH}/user`, async (request, response) => {
    const controllerResponse = await UsersController.getUserById(request.body);
    response.json(controllerResponse);
  });

  app.put(`${API_ROOT_PATH}/user`, async (request, response) => {
    const controllerResponse = await UsersController.addUser(request.body);
    response.json(controllerResponse);
  });
};