const express = require("express")

const app = express()

app.use("/", (req, res, next) => {
    console.log("This always run.");
    next()
})

app.use("/add-product", (req, res, next) => {
    res.send("<h1>Add-Product</h1>")
})

app.use("/", (req, res, next) => {
    console.log("In the another middleware.");
    res.send("<h1>Hello From ExpressJs</h1>")
})

app.listen(3000, (error) => {
    if (error) {
        console.log("Some error occured.");
    }else {
        console.log("Server start listening at post 3000.");
    }
})