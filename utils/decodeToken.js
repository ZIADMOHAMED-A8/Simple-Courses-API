const jwt= require("jsonwebtoken");

function decodeToken(req){
    const secret_key=process.env.jwt_secret_key
    const token=req.headers.authorization.split(' ')[1]
    console.log(token,secret_key)
    return jwt.verify(token,secret_key)
}
module.exports=decodeToken