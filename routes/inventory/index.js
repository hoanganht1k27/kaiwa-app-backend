const express = require('express')
const route = express.Router()

const Inventory = require('../../models/Inventory')
const VideoDetail = require('../../models/VideoDetail')

route.get("/get", (req, res) => {
    let {type} = req.query
    if(!type) {
        return res.status(400).send({
            "error": "Bad request"
        })
    }
    Inventory.find({type: type})
        .then(async(is) => {
            let arr = []
            for(let i = 0; i < is.length; i++) {
                arr.push(VideoDetail.findOne({video_id: String(is[i]._id)}).then(v => {
                    return v
                }))
            }
            Promise.all(arr)
            .then(values => {
                return res.status(200).send(values)
            })
            .catch(err => {
                return res.status(500).send({
                    "error": err.message
                })
            })
        })
        .catch(err => {
            return res.status(500).send({
                "error": "Some error has been occurred"
            })
        })
})

route.post("/add", (req, res) => {
    let {url, type} = req.body
    if(!(url && type)) {
        return res.status(400).send({
            "error": "Bad request"
        })
    }
    let i = new Inventory({
        url: url,
        type: type
    })

    i.save()
        .then(() => {
            return res.status(200).send({
                "message": "Inventory added successfully"
            })
        })
        .catch(err => {
            return res.status(500).send({
                "error": "Some error has been occurred"
            })
        })
})


module.exports = route