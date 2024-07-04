const Product = require("../models/product")

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/index", {
          path: "/",
          pageTitle: "Shop",
          prods: products,
        });
    })
  };

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/product-list", {
          path: "/products",
          pageTitle: "Products",
          prods: products,
        });
    })
  };

  exports.getCart = (req, res, next) => {
    res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
      });
  };

  exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
      });
  };