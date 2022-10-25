const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    video_id: {
        type: String,
        required: true
    },
    record_id: {
        type: String,
        required: true
    },
    teacher_id: {
        type: String,
        required: true
    },
    student_a_id: {
        type: String,
        required: true
    },
    student_b_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ""
    },
    bonus: {
        type: Number,
        default: 0
    }
})

const Feedback = mongoose.model('Feedback', schema)

module.exports = Feedback