const express = require('express')
const route = express.Router()

const userRoute = require('./user')
const feedbackRoute = require('./feedback')
const inventoryRoute = require('./inventory')
const videoRoute = require('./video')
const recordRoute = require('./record');


route.use("/user", userRoute)
route.use("/feedback", feedbackRoute)
route.use("/inventory", inventoryRoute)
route.use("/video", videoRoute)
route.use("/record", recordRoute)

module.exports = route