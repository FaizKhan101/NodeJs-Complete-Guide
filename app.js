const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const rootDir = require("./util/path");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: false, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  //   .sync({ force: true })
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
