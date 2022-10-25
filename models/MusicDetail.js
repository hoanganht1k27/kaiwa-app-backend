const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    music_id: {
        type: String,
        required: true
    },
    price_point: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const MusicDetail = mongoose.model('MusicDetail', schema)

module.exports = MusicDetail