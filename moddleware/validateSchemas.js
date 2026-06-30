const { signUpSchema } = require("../schemas/auth.schema")
const AppError = require("../utils/appError")


function validate(schema){
    console.log('validate a7a')
    return (req,res,next)=>{
        console.log(req)
        const result=schema.safeParse({
            body:req.body,
            params:req.params,
            query:req.query
        })
    
        if(!result.success){
            const error=new AppError(result.error.flatten().fieldErrors) 
            return next(error)
        }
        next()
    }
}

module.exports={validate}