const { default: mongoose, mongo } = require("mongoose");

const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
})

module.exports=mongoose.model('Course',courseSchema)