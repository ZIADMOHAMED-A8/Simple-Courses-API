const jwt= require("jsonwebtoken");

function decodeToken(req,type="access"){
    const secret_key=type==='access' ? process.env.jwt_secret_key : process.env.jwt_refresh_key
    console.log('refresh key',secret_key)
    const token=req.headers.authorization.split(' ')[1]
    
    console.log(token,"token--------------")
    console.log(secret_key,"secret_key--------------")

    console.log(jwt.verify(token,secret_key),"alo alo")
    return jwt.verify(token,secret_key)
    c
}
module.exports=decodeToken