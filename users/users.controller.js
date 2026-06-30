const asyncWrapper = require("../moddleware/asyncWrapper")
const user = require("./users.model")
const httpStatusText = require('../utils/httpStatusText')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const AppError = require("../utils/appError");
const generateJwt = require("../utils/generateJwt");
const verifyToken = require("../moddleware/verifyToken");
const { findByIdAndUpdate } = require("../courses/courses.model");
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
    console.log(req.file,"REQ FILE"); // شوف الصورة وصلت ولا لأ

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

    const token = await generateJwt({
        email,
        id: newUser._id,
        role
    });

    newUser.token = token;

    await newUser.save();

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {
            user: newUser
        }
    });
});

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const error = new AppError('Email is not valid')
        return next(error)
    }
    if (!email || !password) {
        const error = new AppError('Please Provide email and password')
        return next(error)
    }

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
        const error = new AppError('User not found')
        next(error)
    }
    const isSame = await bcrypt.compare(password, existingUser.password)
    if (isSame === false) {
        const error = new AppError('wrong password')
        return next(error)
    }
    const token = await generateJwt(existingUser)
    const updatedUser = await user.findByIdAndUpdate(
        existingUser._id,
        { token },
        { new: true }
    );

    res.send({
        message: 'Login success', data: {
            user: updatedUser
        }
    })

})

module.exports = {
    getUsers,
    register,
    login
}