const express = require("express")
const bodyParser = require("body-parser")
const dotenv = require('dotenv')
const logger = require('morgan')
const cors = require('cors')

const app = express()
dotenv.config({path: 'config.env'})
const port = process.env.PORT || 80

app.use(bodyParser.urlencoded({ extended: false })) 

app.use(bodyParser.json());
app.use(logger('dev'))
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const routeConfig = require('./routes')

const connectDB = require('./database/connection')

connectDB()

app.use("/", routeConfig)


var server = require("http").Server(app);
server.listen(port, () => {
    console.log("Listening on port " + port)
});