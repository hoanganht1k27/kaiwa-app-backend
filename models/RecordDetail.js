const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    video_id: {
        type: String,
        required: true
    },
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
    uploaded_at: {
        type: String,
        default: Date.now()
    },
    checked: {
        type: Boolean,
        default: 0
    },
    name: {
        type: String,
        required: true
    }
})

const RecordDetail = mongoose.model('RecordDetail', schema)

module.exports = RecordDetail