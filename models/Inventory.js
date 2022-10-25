const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    url: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

const Inventory = mongoose.model('Inventory', schema)

module.exports = Inventory