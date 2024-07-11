const { ObjectId } = require("mongodb");
const db = require("../util/database");
const { QueryInterface } = require("sequelize");

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save() {
    return db.getDb().collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updateCartItems = [...this.cart.items]

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updateCartItems[cartProductIndex].quantity = newQuantity
    } else {
      updateCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity })
    }

    const updatedCart = {
      items: updateCartItems,
    };
    return db
      .getDb()
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(id) {
    return db
      .getDb()
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
  }
}

module.exports = User;
