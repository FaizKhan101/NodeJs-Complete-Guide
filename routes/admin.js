const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middlewares/is-auth");
const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title", "Title must be at least 5 character long.")
      .trim()
      .isLength({ min: 4 }),
    body("price", "Price must be at least 5.").isFloat({ min: 5 }),
    body("description", "Decription must be at least 8 character long.")
      .trim()
      .isLength({ min: 8 }),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title", "Title must be at least 5 character long.")
      .trim()
      .isLength({ min: 4 }),
    body("price", "Price must be at least 5.").isFloat({ min: 5 }),
    body("description", "Decription must be at least 8 character long.")
      .trim()
      .isLength({ min: 8 }),
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
