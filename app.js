const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const rootDir = require("./util/path");
const User = require("./models/user");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("66924860b56adcff1b862376")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then((result) => {
    return User.findOne();
  })
  .then((user) => {
    if (!user) {
      const user = new User({
        name: "Faiz",
        email: "test@test.com",
        cart: { items: [] },
      });
      return user.save();
    }
  })
  .then((user) => {
    app.listen(3000, () => console.log("Server start at port: 3000"));
  })
  .catch((err) => {
    console.log(err);
  });
