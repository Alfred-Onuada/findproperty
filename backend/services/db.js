// setup dot env
require('dotenv').config();

const { MongoClient, MongoDBNamespace } = require('mongodb');

const DB_URI = process.env.DB_URI;
const primaryDB = process.env.PRIMARY_DB;

let _dbInstance = null;

module.exports = {
  // abstracts the db connection function
  connect: function() {
    return new Promise(async (resolve, reject) => {
      try {
        let mongoClient = new MongoClient(DB_URI);

        mongoClient.connect();

        _dbInstance = mongoClient.db(primaryDB);

        resolve();
      } catch (error) {
        reject(error);
      }
    })
  },

  getDBInstance: () => {
    if (_dbInstance == null) {
      throw Error("Cannot return an empty db instance, please connecto to the db first");
    }

    return _dbInstance
  },

  // i doubt you have to explicitly close the connection but this here just incase
  disconnect: function () {
    return new Promise(async (resolve, reject) => {
      try {
        if (_dbInstance == null) {
          throw Error("There is no db to disconnect from, it might not have been started");
        }
    
        await _dbInstance.close();
  
        resolve();
      } catch (error) {
        reject(error)
      }
    })
  }
}