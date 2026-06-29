const express = require('express')
const multer=require('multer')
const diskStorage=multer.diskStorage({
    destination:function(req,file,cb){
        console.log('file',file)
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        const filename=`user-${Date.now()}.${file.mimetype.split('/')[1]}`
        cb(null,filename)
    }
})
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.split('/')[0]!=='image'){
        const error=new AppError('avatar should only be an image')
        return cb(error,false)
    }
    cb(null,true)
}
const upload=multer({storage:diskStorage,
    fileFilter
})

const userRouter = express.Router()
const { getUsers,
    register,
    login } = require('./users.controller')
const verifyToken = require('../moddleware/verifyToken')
const { verifyManager } = require('../moddleware/verofyRoles')
const AppError = require('../utils/appError')
userRouter.route('/')
    .get(verifyToken,verifyManager,getUsers)

userRouter.route('/register')
    .post(upload.single('avatar'),register)

userRouter.route('/login')
    .post(login)


module.exports = userRouter