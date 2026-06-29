const { findById } = require("../courses/courses.model");
const user = require("../users/users.model");
const AppError = require("../utils/appError");

async function veriyAdmin(req, res, next) {
    const id = req.user.id
    const userData = await user.findById(id)
    const isAdmin = userData.role === 'admin'
    if (!isAdmin) {
        const error = new AppError('User is not an admin')
        return next(error)
    }
    next()
}

async function verifyManager(req, res, next) {
    const id = req.user.id
    console.log(req.user,"req user")
    const userData = await user.findById(id)
    console.log('the user',req.user)
    const isManager = userData.role === 'manager'
    if (!isManager) {
        const error = new AppError('User is not a manager')
        return next(error)
    }
    next()
}
module.exports = {
    verifyManager,
    veriyAdmin
}