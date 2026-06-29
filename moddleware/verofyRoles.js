const { findById } = require("../courses/courses.model");
const user = require("../users/users.model");
const AppError = require("../utils/appError");
 function authorize(roles) {
   return async (req,res,next)=>{
    const id = req.user.id
    console.log(req.user,"req user")
    const userData = await user.findById(id)
    console.log('the user',req.user)
    const isAllowed = roles.includes(userData.role )
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