
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.SECRET_JWT || 'anhnh'

userAuthMiddleware = (req, res, next) => {
    let {user_id, email, token} = req.body
    try {
        let decodedToken = jwt.verify(token, jwtSecret)
        if(decodedToken.user_id == user_id && decodedToken.email == email) {
            return next()
        }
        return res.status(400).send({
            "error": "Invalid token"
        })
    } catch(err) {
        return res.status(400).send({
            "error": "Invalid token"
        })
    }
    
}


exports.userAuthMiddleware = userAuthMiddleware