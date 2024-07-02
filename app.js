const express = require("express");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.use("/", (req, res, next) => {
  console.log("This always run.");
  next();
});

app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="product" method="POST"><input type="text" name="title"/><button type="submit">Add Product</button></form>'
  );
});

app.use("/product", (req, res, next) => {
    console.log(req.body.title);
  res.send("<h1>Product Added</h1>");
});

app.use("/", (req, res, next) => {
  console.log("In the another middleware.");
  res.send("<h1>Hello From ExpressJs</h1>");
});

app.listen(3000, (error) => {
  if (error) {
    console.log("Some error occured.");
  } else {
    console.log("Server start listening at post 3000.");
  }
});
