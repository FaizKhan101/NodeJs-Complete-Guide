const db = require("../util/database")

class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description
  }

  save() {
    return db.getDb().collection("products").insertOne(this)
  }
}

module.exports = Product