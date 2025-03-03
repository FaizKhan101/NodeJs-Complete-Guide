const path = require("path");

const express = require("express");

const isAuth = require("../middlewares/is-auth");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart", isAuth, shopController.postCart);

router.post("/add",isAuth, shopController.increaseQty)

router.post("/sub",isAuth, shopController.decreaseQty)

router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

router.get("/checkout", isAuth, shopController.getCheckout)

router.post("/create-order", isAuth, shopController.postOrder);

router.get("/orders", isAuth, shopController.getOrders);

router.get("/orders/:orderId", isAuth, shopController.getInvoice)

module.exports = router;
