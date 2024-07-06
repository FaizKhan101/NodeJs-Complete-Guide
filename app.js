const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const rootDir = require("./util/path");
const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
