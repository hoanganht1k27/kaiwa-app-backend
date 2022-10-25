const mongoose = require("mongoose")

let schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    total_point: {
        type: Number,
        default: 0
    },
    used_point: {
        type: Number,
        default: 0
    },
    video_id: {
        type: String,
        default: ""
    },
    record_id: {
        type: String,
        default: ""
    },
    music_id: {
        type: String,
        default: ""
    },
    avatar_url: {
        type: String,
        default: "noava.png"
    },
    isTeacher: {
        type: Boolean,
        default: 0
    }

})

const User = mongoose.model('User', schema)

module.exports = User