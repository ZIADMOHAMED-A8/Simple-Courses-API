const express = require('express')
const userRouter = express.Router()
const { getUsers,
    register,
    login } = require('./users.controller')
const verifyToken = require('../moddleware/verifyToken')
const { verifyManager } = require('../moddleware/verofyRoles')
userRouter.route('/')
    .get(verifyToken,verifyManager,getUsers)

userRouter.route('/register')
    .post(register)

userRouter.route('/login')
    .post(login)


module.exports = userRouter