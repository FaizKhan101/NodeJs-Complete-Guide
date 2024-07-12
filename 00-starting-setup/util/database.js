const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

function connectToMongoDb(callback) {
  MongoClient.connect("mongodb://localhost:27017/shop2")
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
}

function getDb() {
  return _db ? _db : "Could'nt connect to database!"
}

module.exports = {
  connectToMongoDb: connectToMongoDb,
  getDb: getDb
}
