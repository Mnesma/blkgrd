const { v4: uuid } = require("uuid");
const { AuthorizationCode } = require("simple-oauth2");
const { discord } = require("../../app.config.json");
const { AUTHENTICATION_ROOT } = require("../../../shared/constants");
const { DOMAIN, ResponseCode } = require("../../constants");
const { ApiResponse } = require("../../models/ApiResponse");
const { UsersController } = require("../user/UsersController");

const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

class DiscordAuthentication {
  static EXPIRATION_WINDOW_IN_SECONDS = 300;
  static AUTH_TOKEN_COOKIE_NAME = "AuthToken";

  static states = new Map();

  static client = new AuthorizationCode({
    client: {
      id: discord.client.id,
      secret: discord.client.secret
    },
    auth: {
      tokenHost: "https://discord.com",
      tokenPath: "/api/oauth2/token",
      revokePath: "/api/oauth2/token/revoke",
      authorizePath : "/api/oauth2/authorize"
    }
  });

  static setAuthToken(response, token) {
    response.cookie(DiscordAuthentication.AUTH_TOKEN_COOKIE_NAME, JSON.stringify(token), { 
      expires: new Date(Date.now() + MONTH_IN_MILLISECONDS),
      httpOnly: true,
      signed: true
    });
  }

  static authenticate(request, response) {
    return new Promise(async (resolve, reject) => {
      try {
        const existingAuthTokenJSON = request.signedCookies[DiscordAuthentication.AUTH_TOKEN_COOKIE_NAME];
  
        if (!existingAuthTokenJSON) {      
          reject(
            ApiResponse
              .code(ResponseCode.Unauthorized)
          );
          return;
        }
  
        const existingAuthToken = DiscordAuthentication.client.createToken(JSON.parse(existingAuthTokenJSON));
  
        if (existingAuthToken.expired(DiscordAuthentication.EXPIRATION_WINDOW_IN_SECONDS)) {
          try {
            const newAuthToken = await accessToken.refresh({
              scope: "identify"
            });
  
            DiscordAuthentication.setAuthToken(response, newAuthToken);
          } catch {
            response.clearCookie(DiscordAuthentication.AUTH_TOKEN_COOKIE_NAME);
            reject(
              ApiResponse
                .code(ResponseCode.Unauthorized)
            );
            return;
          }
        }
  
        resolve(
          ApiResponse
            .code(ResponseCode.Success)
        );
      } catch {
        reject(
          ApiResponse
            .code(ResponseCode.UnknownError)
        );
      }
    });
  }

  static logIn(request) {
    return new Promise((resolve, reject) => {
      try {
        const newStateId = uuid();
  
        DiscordAuthentication.states.set(newStateId, `${DOMAIN}/${request.originalUrl}`);
  
        const authorizationUri = DiscordAuthentication.client.authorizeURL({
          redirect_uri: `${DOMAIN}${AUTHENTICATION_ROOT}/discord/redirect`,
          scope: "identify",
          prompt: "none",
          state: newStateId
        });
  
        resolve(
          ApiResponse
            .code(ResponseCode.Success)
            .data({ authorizationUri })
        );
      } catch {
        reject(
          ApiResponse
            .code(ResponseCode.UnknownError)
        );
      }
    });   
  }

  static redirect(request, response) {
    return new Promise(async (resolve, reject) => {
      const { code, state: stateId } = request.query;
      let redirectUrl = DOMAIN;
  
      if (!DiscordAuthentication.states.has(stateId)) {
        console.log(`Recieved request to ${AUTHENTICATION_ROOT}/discord/redirect with an unknown state value`);
        response.redirect(redirectUrl);
        reject(
          ApiResponse
            .code(ResponseCode.Unauthorized)
        );
        return;
      } else {
        redirectUrl = DiscordAuthentication.states.get(stateId);
        DiscordAuthentication.states.delete(stateId);
      }
  
      try {
        const accessToken = await DiscordAuthentication.client.getToken({
          code,
          redirect_uri: `${DOMAIN}${AUTHENTICATION_ROOT}/discord/redirect`,
          scope: "identify"
        });
  
        this.setAuthToken(response, accessToken);
  
        const userDataResponse = await fetch("https://discord.com/api/v10/users/@me", {
          headers: {
            "Authorization": `Bearer ${accessToken.token.access_token}`
          }
        });
  
        if (userDataResponse.status === 200) {
          resolve(
            ApiResponse
              .code(ResponseCode.Success)
              .data(await userDataResponse.json())
          );
          return;
        }
        
        reject(
          ApiResponse
            .code(ResponseCode.UnknownError)
        );
      } catch {
        reject(
          ApiResponse
            .code(ResponseCode.UnknownError)
        );
      }
    });
  }
}

module.exports = {
  DiscordAuthentication
};
