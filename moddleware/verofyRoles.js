const { findById } = require("../courses/courses.model");
const jwt= require("jsonwebtoken");

const user = require("../users/users.model");
const AppError = require("../utils/appError");
 function authorize(roles) {
   return async (req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1]
    const decodedToken=jwt.verify(token,process.env.jwt_secret_key)
    console.log(decodedToken,"decodeddddd")
    const isAllowed = roles.includes(decodedToken.role )
    if (!isAllowed) {
        const error = new AppError('Forbidden')
        return next(error)
    }
    next()
   }
}
module.exports = {
    authorize,
   
}