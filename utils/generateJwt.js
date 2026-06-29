const jwt=require('jsonwebtoken')

async function generateJwt({email,_id}){
    const token=await jwt.sign({email:email,id:_id},process.env.jwt_secret_key,{expiresIn:'100m'})
    return token
}

module.exports=generateJwt