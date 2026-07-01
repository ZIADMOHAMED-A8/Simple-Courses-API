const bcrypt=require('bcryptjs')
async function hash(value){
    return await bcrypt.hash(value, 10)
}
module.exports={
    hash
}