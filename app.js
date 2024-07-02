const express = require("express")

const app = express()

app.use((req, res, next) => {
    console.log("In the middleware.");
    next() // Allow the request to go to the next middleware.
})

app.use((req, res, next) => {
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