const jwt=require('jsonwebtoken')

async function generateJwt({email,id}){
    console.log(id,"id")
    const token=jwt.sign({email:email,id:id},process.env.jwt_secret_key,{expiresIn:'100m'})
    return token
}

module.exports=generateJwt