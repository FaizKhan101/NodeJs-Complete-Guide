const express = require("express")

const router = express.Router()

router.use("/", (req, res, next) => {
    res.send("<h1>Hello From ExpressJs</h1>");
  });

module.exports = router