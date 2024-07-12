const { ObjectId } = require("mongodb");
const db = require("../util/database");

class User {
  constructor(name, email, id, cart) {
    this.name = name;
    this.email = email;
    this._id = id;
    this.cart = cart; //{items: []}
  }

  save() {
    return db.getDb().collection("users").insertOne(this);
  }

  addToCart(productId) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === productId.toString();
    });

    const updatedCartItems = [...this.cart.items];

    let newQuantity = 1;
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(productId),
        quantity: 1,
      });
    }

    const updatedCart = { items: updatedCartItems };
    return db
      .getDb()
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const productIds = this.cart.items.map((cp) => {
      return cp.productId;
    });
    return db
      .getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }

  deleteItemFromCart(productId) {
    const updatedCart = this.cart.items.filter((p) => {
      return p.productId.toString() !== productId.toString();
    });
    return db
      .getDb()
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCart } } }
      );
  }

  addOrder() {
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
          },
        };
        return db.getDb().collection("orders").insertOne(order);
      })
      .then((result) => {
        db.getDb()
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      })
      .catch((err) => console.log(err));
  }

  getOrders() {
    return db.getDb().collection("orders").find().toArray()
  }

  static findById(id) {
    return db
      .getDb()
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
  }
}

module.exports = User;
