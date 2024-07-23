const express = require("express");
const { check, body } = require("express-validator");

const User = require("../models/user")
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    check("email").isEmail().withMessage("Please enter a valid email.").custom((value, {req}) => {
        return User.findOne({email: value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject("Email address already exist.")
            }
        }) 
    }),
    body(
      "password",
      "Please enter a password with only number and text and at least 5 character long."
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error("Password have to match.");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

module.exports = router;
