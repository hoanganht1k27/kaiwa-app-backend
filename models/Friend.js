const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    a_id: {
        type: String,
        required: true
    },
    b_id: {
        type: String,
        required: true
    }
})

const Friend = mongoose.model('Friend', schema)

module.exports = Friend