const express = require("express");
const { check, body } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email address already exist.");
          }
        });
      }),
    body(
      "password",
      "Please enter a password with only number and text and at least 5 character long."
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password have to match.");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post(
  "/login",
  [
    body("email", "Incorrect Email or Password.")
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject("Incorrect email or password.");
          }
        });
      }),
    body("password").custom((value, { req }) => {
      return User.findOne({ email: req.body.email })
        .then((userDoc) => {
          return bcrypt.compare(value, userDoc.password);
        })
        .then((passMatch) => {
          if (!passMatch) {
            return Promise.reject("Incorrect email or password.");
          }
        });
    }),
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

module.exports = router;
