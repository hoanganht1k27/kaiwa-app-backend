const express = require('express')
const route = express.Router()

const {checkIsTeacher} = require('../../controller/userController')
const Feedback = require('../../models/Feedback')
const RecordDetail = require('../../models/RecordDetail')

const User = require('../../models/User')

route.get('/detail/:record_id', (req, res) => {
    let { record_id } = req.params
    Feedback.findOne({record_id: record_id})
        .then(f => {
            if(f)
            return res.status(200).send(f)
            else {
                return res.status(200).send({
                    "message": "No feedback for this record"
                })
            }
        })
        .catch(err => {
            return res.status(500).send({
                "error": "Some error has been occurred"
            })
        })
})

route.post('/:teacher_id/bonus', async (req, res) => {
    if(!checkIsTeacher(req.params.teacher_id)) {
        return res.status(400).send({
            "error": "User is not a teacher"
        })
    }
    let {a_id, b_id, bonus} = req.body
    if(!(a_id && b_id && bonus)) {
        return res.status(400).send({
            "error": "Bad request"
        })
    }
    let a = await User.findById(a_id)
    let b = await User.findById(b_id)
    a.total_point += bonus
    b.total_point += bonus

    a.save()
        .then(() => {
            b.save()
                .then(() => {
                    return res.status(200).send({
                        "message": "Added bonus point to student"
                    })
                })
                .catch(err => {
                    return res.status(500).send({
                        "error": "Some error when adding bonus point"
                    })
                })
        })
        .catch(err => {
            return res.status(500).send({
                "error": "Some error when adding bonus point"
            })
        })

})

route.post("/:teacher_id/add-feedback", async (req, res) => {
    if(!checkIsTeacher(req.params.teacher_id)) {
        return res.status(400).send({
            "error": "User is not a teacher"
        })
    }
    let teacher_id = req.params.teacher_id
    let {video_id, record_id, student_a_id, student_b_id, content, bonus} = req.body
    if(!(video_id && record_id && student_a_id && student_b_id && content && bonus)) {
        return res.status(400).send({
            "error": "Bad request"
        })
    }
    let f = new Feedback({
        video_id: video_id,
        record_id: record_id,
        teacher_id: teacher_id,
        student_a_id: student_a_id,
        student_b_id: student_b_id,
        content: content,
        bonus: bonus
    })

    let r = await RecordDetail.findById(record_id)
    if(r.checked == 1) {
        return res.status(500).send({
            "error": "This record has been checked"
        })
    }
    r.checked = 1

    f.save()   
        .then(async () => {
            let a = await User.findById(student_a_id)
            let b = await User.findById(student_b_id)
            a.total_point += bonus
            b.total_point += bonus
            await a.save()
            await b.save()
            await r.save()
            return res.status(200).send({
                "message": "Send feedback successfully"
            })
        })
        .catch(err => {
            return res.status(500).send({
                "error": "Some error has been ocurred"
            })
        })
})


module.exports = route