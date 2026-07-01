const jwt = require('jsonwebtoken')

async function generateJwt({ email, id, role }) {
    console.log(id, "id")
    const accessToken = jwt.sign({ email: email, id: id, role: role }, process.env.jwt_secret_key,  {expiresIn:'30m' })
    const refreshToken = jwt.sign({ email: email, id: id, role: role }, process.env.jwt_refresh_key,  {expiresIn:'7d'} )
    console.log(refreshToken,"this is the refresh",process.env.jwt_refresh_key,"this is refresh key")
    return {accessToken,refreshToken}
}



module.exports = generateJwt