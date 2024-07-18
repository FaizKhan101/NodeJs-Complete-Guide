const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  let errorMessage = req.flash("error");
  if (errorMessage.length > 0) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: errorMessage,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let user;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (!userDoc) {
        req.flash("error", "Incorrect email or password!");
        return res.redirect("/login");
      }
      user = userDoc;
      return bcrypt.compare(password, userDoc.password);
    })
    .then((passwordMatch) => {
      if (!passwordMatch) {
        req.flash("error", "Incorrect email or password!");
        return res.redirect("/login");
      }
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSignup = (req, res, next) => {
  let errorMessage = req.flash("error");
  if (errorMessage.length > 0) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: errorMessage,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email }).then((userDoc) => {
    if (userDoc) {
      req.flash("error", "Email address already exist!");
      return res.redirect("/signup");
    }
    if (password !== confirmPassword) {
      req.flash("error", "Password must be match!");
      return res.redirect("/signup");
    }
    return bcrypt
      .hash(password, 12)
      .then((hashPassward) => {
        const user = new User({
          email: email,
          password: hashPassward,
          cart: { items: [] },
        });
        return user.save();
      })
      .then((result) => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
