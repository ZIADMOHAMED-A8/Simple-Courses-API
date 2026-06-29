const { default: mongoose } = require("mongoose");
const { validate } = require("../courses/courses.model");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const roles=require('../utils/rolesArray')
const user = mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => emailRegex.test(value),
            message: "Please enter a valid email address"
        }
    },
    password: {
        required: true,
        type: String,
    },
    token:{
        type:String
    },
    role:{
        type:String,
        enum:Object.values(roles),
        require:true,
        default:roles.user
    },
    avatar:{
        type:String,
        default:'/uploads/profile.jpg'
    }
})
const bcrypt = require("bcryptjs");

user.pre("save", async function () {

    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});
module.exports=mongoose.model('users',user)