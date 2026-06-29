const jwt= require("jsonwebtoken");
const AppError = require("../utils/appError");

async function verifyToken(req,res,next){
    let token=req.headers.authorization
    if(!token){
        const error=new AppError('no token provided')
        return next(error)
    }
     token=token.split(' ')[1]
     console.log(process.env.jwt_secret_key)
     const decodedToken=jwt.verify(token,process.env.jwt_secret_key)
     console.log(decodedToken)
     next()
}
module.exports=verifyToken