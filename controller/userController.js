
const User = require('../models/User')

const {hashPassword, comparePassword} = require('../utils/password')

const jwt = require('jsonwebtoken')

const jwtSecret = process.env.SECRET_JWT || "anhnh"

userRegister = async (email, password, fullname, isTeacher) => {
    let p = await hashPassword(password)
    let u = new User({
        email: email,
        password: p,
        fullname: fullname,
        isTeacher: isTeacher
    })
    return u.save()    
}

userLogin = async (email, password) => {
    let u = await findUserByEmail(email)
    if(!u) {
        return Promise.reject(new Error("No user with this email"))
    }
    let res = await comparePassword(password, u.password)
    if(res) {
        let token = jwt.sign(
            {
                user_id: u._id, 
                email: u.email
            },
            jwtSecret,
            {
                expiresIn: "2h"
            }
        )
        return Promise.resolve({u, token})
    }
}

findUserByEmail = async (email) => {
    let u = await User.findOne({email: email})
    return u
}

checkIsTeacher = async (id) => {
    let u = await User.findById(id)
    return u.isTeacher
}

exports.userRegister = userRegister
exports.userLogin = userLogin
exports.checkIsTeacher = checkIsTeacher