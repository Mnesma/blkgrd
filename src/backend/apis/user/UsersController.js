const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-upsert"));
const { DB_NAME, ResponseCode } = require("../../constants");
const ApiResponse = require("../../ApiResponse");
// const { v4: uuid } = require("uuid");

class UsersController {
  static docName = "users";
  static initialUsersDoc = {
    _id: UsersController.docName,
    allUsers: []
  };

  constructor() {
    this.database = new PouchDB(DB_NAME);
    this.createUsersDocIfDoesntExist();
  }

  async createUsersDocIfDoesntExist() {
    try {
      await this.database.get(UsersController.docName);
    } catch (error) {
      if (error.status === 404) {
        return this.database.put(UsersController.initialUsersDoc);
      } else {
        console.log(error, "UsersController.createUsersDocIfDoesntExist()");
      }
    }
  }

}

module.exports = new UsersController();