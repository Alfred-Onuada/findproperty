// setup dot env
require('dotenv').config();

const { MongoClient } = require('mongodb');

const DB_URI = process.env.DB_URI;
const primaryDB = process.env.PRIMARY_DB;

let _dbInstance;

module.exports = {
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

  getDBInstance: () => _dbInstance
}