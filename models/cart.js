const path = require("path");
const fs = require("fs");

const rootDir = require("../util/path");

const filePath = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addToCart(id, productPrice) {
    let cart = { products: [], totalPrice: 0 };
    fs.readFile(filePath, (err, fileContent) => {
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;

      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };

      const product = updatedCart.products.find((p) => p.id === id);
      const productQty = product.qty;

      updatedCart.products = updatedCart.products.filter((prod) => prod.id !== id);
      updatedCart.totalPrice -= productPrice * productQty;

      fs.writeFile(filePath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
};
