const { ObjectId } = require("mongodb");
const db = require("../util/database")

class User {
  constructor(name, email, id) {
    this.name = name;
    this.email = email
    this._id = id
  }

  save() {
    return db.getDb().collection("users").insertOne(this)
  }

  static findById(id) {
    return db.getDb().collection("users").findOne({ _id: new ObjectId(id) })
  }
}

module.exports = User