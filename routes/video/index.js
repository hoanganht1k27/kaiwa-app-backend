const express = require('express')
const route = express.Router()

const VideoDetail = require('../../models/VideoDetail')
const { formatDate } = require('../../utils/date')

route.post('/add', (req, res) => {
    let {url, level, topic, created_by_id, description, name, thumbnail_url} = req.body
    if(!(url, level, topic, created_by_id, description, name, thumbnail_url)) {
        return res.status(400).send({
            "error": "Bad request"
        })
    }

    
    let v = new VideoDetail({
        url: url,
        level: level,
        topic: topic,
        created_by_id: created_by_id,
        description: description,
        name: name,
        thumbnail_url: thumbnail_url,
        uploaded_at: formatDate()
    })

    v.save()
        .then(() => {
            return res.status(200).send({
                "message": "Video added successfully"
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({
                "error": "Some error has been occurred"
            })
        })
})  

route.get('/detail/:video_id', (req, res) => {
    let video_id = req.params.video_id
    console.log(video_id)
    VideoDetail.findById(video_id)
        .then(v => {
            return res.status(200).send(v)
        })
        .catch(err => {
            return res.status(500).send({
                "error": "Some error has been occurred"
            })
        })
})

route.get('/search', async (req, res) => {
    let {level, topic, name} = req.query
    let obj = {}
    if(level) obj.level = level
    if(topic) obj.topic = topic
    let videos = null
    if(obj != {}) {
        videos = await VideoDetail.find(obj)
    } else {
        videos = await VideoDetail.find()
    }

    if(name) {
        
    }

    return res.status(200).send(videos)

})

route.get('/get', async (req, res) => {
    VideoDetail.find()
        .then(values => {
            return res.status(200).send(values)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({
                "error": "Some error has been occurred"
            })
        })
})

route.get('/topic/get', async (req, res) => {
    let videos = await VideoDetail.find()
    let arr = []
    for(let i = 0; i < videos.length; i++) {
        let v = videos[i]
        arr.push(v.topic)
    }

    let s = [...new Set(arr)]
    return res.status(200).send(s)
})

module.exports = route