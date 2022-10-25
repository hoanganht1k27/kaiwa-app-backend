const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        required: true
    },
    created_by_id: {
        type: String,
        required: true
    },
    uploaded_at: {
        type: String,
        default: Date.now()
    },
    description: {
        type: String,
        default: ""
    },
    thumbnail_url: {
        type: String,
        required: true
    }
})

const VideoDetail = mongoose.model('VideoDetail', schema)

module.exports = VideoDetail