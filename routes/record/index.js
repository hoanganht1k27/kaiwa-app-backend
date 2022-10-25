const express = require('express')
const RecordDetail = require('../../models/RecordDetail')
const User = require('../../models/User')
const { formatDate } = require('../../utils/date')
const route = express.Router()

route.post('/add', (req, res) => {
    let {url, name, level, topic, teacher_id, student_a_id, student_b_id, video_id} = req.body
    let r = new RecordDetail({
        url: url,
        name: name,
        video_id: video_id,
        level: level,
        topic: topic,
        teacher_id: teacher_id,
        student_a_id: student_a_id,
        student_b_id: student_b_id,
        uploaded_at: formatDate()
    })

    r.save().then((r) => {
        return res.status(200).send(r) 
    })
    .catch(err => {
        console.log(err)
        return res.status(500).send({
            "error": "Some error has been occurred"
        })
    })

})

route.get('/:record_id', (req, res) => {
    let {record_id} = req.params
    RecordDetail.findById(record_id)
        .then(async (r) => {
            let student_a_id = r.student_a_id
            let student_b_id = r.student_b_id
            console.log(student_a_id)
            let a = await User.findById(student_a_id)
            let b = await User.findById(student_b_id)
            console.log(a)
            r._doc.a_fullname = a.fullname
            r._doc.b_fullname = b.fullname
            return res.status(200).send(r)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({
                "error": "Some error has been occurred"
            })
        })
})

module.exports = route