const DB_NAME = "blkgrd-db";

const DOMAIN = "http://localhost:8080";

const MONTH_IN_MILLISECONDS = 2592000000;

const ResponseCode = {
  Success: "Success",
  InvalidUserId: "InvalidUserId",
  InvalidUserEmail: "InvalidUserEmail",
  InvalidNewUser: "InvalidNewUser",
  InvalidPermissions: "InvalidPermissions",
  UserAlreadyExists: "UserAlreadyExists",
  InvalidRequest: "InvalidRequest",
  UnknownError: "UnknownError",
  Unauthorized: "Unauthorized"
};

const AuthenticationMethod = {
  Discord: 'discord'
};

module.exports = {
  DOMAIN,
  DB_NAME,
  MONTH_IN_MILLISECONDS,
  ResponseCode,
  AuthenticationMethod
};