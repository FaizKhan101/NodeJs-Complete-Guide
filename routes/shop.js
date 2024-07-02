const path = require("path")

const express = require("express")

const adminData = require("./admin")

const rootDir = require("../util/path")

const router = express.Router()

router.get("/", (req, res, next) => {
  const prods = adminData.products
    res.render("shop", {
      path: "/",
      pageTitle: "Shop",
      prods: prods
    })
  });

module.exports = router