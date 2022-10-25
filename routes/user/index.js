const express = require('express')
const route = express.Router()
const User = require('../../models/User')

const {userRegister, userLogin} = require('../../controller/userController')
const {userAuthMiddleware} = require('../../middleware/userMiddleware')
const MusicDetail = require('../../models/MusicDetail')
const Feedback = require('../../models/Feedback')
const RecordDetail = require('../../models/RecordDetail')

route.get("/", (req, res) => {
    res.send("asdf")
})

route.post("/register", (req, res) => {
    let {email, password, fullname, isTeacher} = req.body
    if (!(email && password && fullname)) {
        return res.status(400).send({
            "error": "Bad request"
        });
    }
    userRegister(email, password, fullname, isTeacher)
        .then(u => {
            res.status(200).send({
                "message": "Register successfully"
            })
        })
        .catch(err => {
            res.status(500).send({
                "error": err.message
            })
        })
})

route.post("/login", (req, res) => {
    let {email, password} = req.body
    console.log(req.body)
    if (!(email && password)) {
        return res.status(400).send({
            "error": "Bad request"
        });
    }
    userLogin(email, password)
        .then(({u, token}) => {
            res.status(200).send({
                "user_id": u._id,
                "fullname": u.fullname,
                "email": u.email,
                "total_point": u.total_point,
                "used_point": u.used_point,
                "avatar_url": u.avatar_url,
                "token": token,
                "isTeacher": u.isTeacher
            })
        })
        .catch(err => {
            res.status(500).send({
                "error": err.message
            })
        })
})

route.get("/:id/isTeacher", (req, res) => {
    User.findById(req.params.id)
        .then(u => {
            return res.status(200).send({
                "user_id": req.params.id,
                "isTeacher": u.isTeacher
            })
        })
        .catch(err => {
            return res.status(400).send({
                "error": err.message
            })
        })
})

route.get("/profile/:id", (req, res) => {
    User.findById(req.params.id)
        .then(u => {
            let user_id = String(u._id)
            if(!u.isTeacher)
            RecordDetail.find({$or: [
                {student_a_id: user_id},
                {student_b_id: user_id}
            ]}).then(values => {
                let p = []
                for(let i = 0; i < values.length; i++) {
                    p.push(
                        User.findById(values[i].teacher_id)
                            .then(nu => {
                                let x = values[i]._doc
                                x.teacher_name = nu.fullname
                                return x                            
                            })
                    )
                }
                Promise.all(p)
                    .then(vs => {
                        let ans = {"user_detail": u}
                        ans.records = values
                        return res.status(200).send(ans)
                    })
                // console.log(values)
                
            })
            else {
                RecordDetail.find({$or: [
                    {teacher_id: user_id}
                ]}).then(values => {
                    let p = []
                    for(let i = 0; i < values.length; i++) {
                        p.push(
                            User.findById(values[i].teacher_id)
                                .then(nu => {
                                    let x = values[i]._doc
                                    x.teacher_name = nu.fullname
                                    return x                            
                                })
                        )
                    }
                    Promise.all(p)
                        .then(vs => {
                            let ans = {"user_detail": u}
                            ans.records = values
                            return res.status(200).send(ans)
                        })
                    // console.log(values)
                    
                })
            }
            
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({
                "error": "Some error has been occurred"
            })
        })
})

route.post("/profile/:id/change-info", (req, res) => {
    let {fullname, password, avatar_url} = req.body
    User.findById(req.params.id)
        .then(u => {
            if(fullname) u.fullname = fullname
            if(password) u.password = password
            if(avatar_url) u.avatar_url = avatar_url
            u.save()
                .then(nu => {
                    return res.status(200).send({
                        "message": "Change info successfully"
                    })
                })
        })
        .catch(err => {
            return res.status(500).send({
                "error": err.message
            })
        })
})

route.post('/:id/buy-music/:music_id', async (req, res) => {
    let u = await User.findById(req.params.id)
    let music = await MusicDetail.findOne({music_id: req.params.music_id})

    if(u.total_point - u.used_point < music.price_point) {
        return res.status(400).send({
            "error": "User cannot buy this music"
        })
    }

    u.music_id += "," + req.params.music_id
    u.used_point += music.price_point

    u.save()
        .then(nu => {
            return res.status(200).send({
                "message": "Buy successfully"
            })
        })
        .catch(err => {
            return res.status(500).send({
                "error": err.message
            })
        })
})

route.get('/ranking', (req, res) => {
    const limit = 10
    User.find({isTeacher: false})
        .sort({total_point: -1})
        .limit(10)
        .then(u => {
            return res.status(200).send(u)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({
                "error": "Some error has been occurred"
            })
        })

})

module.exports = route
