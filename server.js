const express = require("express")
const bodyParser = require("body-parser")
const dotenv = require('dotenv')

const app = express()
dotenv.config({path: 'config.env'})
const port = process.env.PORT || 80

app.get("/", (req, res) => {
    res.send("Hello")
})


var server = require("http").Server(app);
server.listen(port, () => {
    console.log("Listening on port " + port)
});