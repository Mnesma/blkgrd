const { DiscordAuthentication } = require("./DiscordAuthentication");
const { DOMAIN, AuthenticationMethod } = require("../../constants");
const { AUTHENTICATION_ROOT } = require("../../../shared/constants");

module.exports = (app) => {
  app.get(`${AUTHENTICATION_ROOT}/:method/authenticate`, async (request, response) => {
    switch (request.params.method) {
      case AuthenticationMethod.Discord: {
        DiscordAuthentication.authenticate(request, response);
        break;
      }
      default: {
        response.redirect(DOMAIN);
      }
    }
  });

  app.get(`${AUTHENTICATION_ROOT}/:method/redirect`, async (request, response) => {
    switch(request.params.method) {
      case AuthenticationMethod.Discord: {
        DiscordAuthentication.redirect(request, response);
        break;
      }
      default: {
        response.redirect(DOMAIN);
      }
    }
  });
};