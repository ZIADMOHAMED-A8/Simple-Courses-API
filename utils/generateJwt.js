const jwt=require('jsonwebtoken')

async function generateJwt({email,id,role}){
    console.log(id,"id")
    const token=jwt.sign({email:email,id:id,role:role},process.env.jwt_secret_key,{expiresIn:'7d'})
    return token
}

module.exports=generateJwt