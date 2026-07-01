const AppError = require("../utils/appError");
const decodeToken = require("../utils/decodeToken");
 function authorize(roles) {
   return async (req,res,next)=>{
    console.log('start verify')
    const decodedToken=decodeToken(req)
    console.log(decodedToken,"decoded token test")
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