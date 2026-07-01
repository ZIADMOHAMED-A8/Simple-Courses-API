const asyncWrapper = require("../moddleware/asyncWrapper")
const user = require("./users.model")
const httpStatusText = require('../utils/httpStatusText')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const AppError = require("../utils/appError");
const generateJwt = require("../utils/generateJwt");
const verifyToken = require("../moddleware/verifyToken");
const { findByIdAndUpdate } = require("../courses/courses.model");
const decodeToken = require("../utils/decodeToken");
const { hash } = require("../utils/hashing");
const getUsers = asyncWrapper(async (req, res, next) => {
    const query = req.query
    const page = query.page
    const limit = query.limit
    const skip = (page - 1) * limit
    const users = await user.find({}, { "__v": false }).limit(limit).skip(skip)
    res.json({
        message: httpStatusText.SUCCESS, data:
            { users: users }
    })
})


const register = asyncWrapper(async (req, res, next) => {
    console.log(req.file, "REQ FILE"); 

    const { firstName, lastName, email, password, role } = req.body;

    const checkUser = await user.findOne({ email });
    if (checkUser) {
        return next(new AppError("User already exists"));
    }

    const newUser = new user({
        firstName,
        lastName,
        email,
        password,
        role,
        avatar: req.file?.filename
    });

    const {accessToken,refreshToken} = await generateJwt({
        email,
        id: newUser._id,
        role
    });
    

    newUser.refreshToken = refreshToken;
    await newUser.save();

  
    const userResponse = newUser.toObject();
    delete userResponse.password; 

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {
            user: {
                ...userResponse, 
                accessToken: accessToken,
                refreshToken
            }
        }
    });
});

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return next(new AppError('Email is not valid'));
    }
    if (!email || !password) {
        return next(new AppError('Please Provide email and password'));
    }

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
        return next(new AppError('User not found')); 
    }
    
    const isSame = await bcrypt.compare(password, existingUser.password);
    if (!isSame) {
        return next(new AppError('wrong password'));
    }
    
    
    const {accessToken,refreshToken} = await generateJwt({
        email,
        id: existingUser._id,
        role: existingUser.role
    });
    
    const hashedToken= await hash(refreshToken);
  
    
    const updatedUser = await user.findByIdAndUpdate(
        existingUser._id,
        { refreshToken: hashedToken },
        { new: true }
    ).lean(); 

    delete updatedUser.password; 

    res.send({
        message: 'Login success', 
        data: {
            user: {
                ...updatedUser, 
                accessToken: accessToken,
                refreshToken
            }
        }
    });
});

const getAnotherUser = async (req, res, next) => {
    const id = req.params.id
    const userSearched = await user.findById(id)
    console.log(userSearched)
    if (!userSearched) {
        const error = new AppError('user not found')
        return next(error)
    }
    res.status(200).json(userSearched)
}

const refresh=async(req,res,next)=>{
    console.log('asdadsadasdsa')
    console.log(req.headers.authorization.split(' ')[1])
    console.log('breakpoint1')
    const {id}=decodeToken(req,"refresh")
    console.log('breakpoint2')

    const existingUser=await user.findById(id)
    console.log(existingUser.refreshToken,"refresh token")
    
    const isMatched=await bcrypt.compare(req.headers.authorization.split(' ')[1],existingUser.refreshToken);
    console.log(isMatched)
    if(!isMatched){
        const error=new AppError('invalid refresh token')
        return next(error)
    }


    const {accessToken,refreshToken} = await generateJwt({
        email:existingUser.email,
        id: existingUser._id,
        role:existingUser.role
    });
    
    const hashedToken= await hash(refreshToken);
    await user.findByIdAndUpdate(id,{refreshToken:hashedToken})
    res.status(200).json({
        accessToken,
        refreshToken
    })
}
module.exports = {
    getUsers,
    register,
    login,
    getAnotherUser,
    refresh
}
