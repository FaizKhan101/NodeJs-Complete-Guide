const db = require("../util/database");

module.exports = class Product {
  constructor(title, imageUrl, description, price, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = +price;
    this.id = id;
  }

  save() {}

  static fetchAll() {
    return db.execute(`SELECT * FROM products`)
  }
  static findById(id) {}

  static deleteById(id) {}
};
