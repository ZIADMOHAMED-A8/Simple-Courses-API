const express = require('express')
const { body } = require('express-validator')

const rotuer=express.Router()
let {addCourse,getCourses,editCourse,deleteCourse,getSingleCourse}=require('./courses.controller')
rotuer.route('/')
.get( getCourses)
.post(body('title').notEmpty().withMessage('title is required')
    .isLength({ min: 2 }).withMessage('title should be more than 2 charchets')
    , body('price').notEmpty().withMessage('price must be provided')
        .isInt({ min: 1 }).withMessage('your price is not valid')
    , addCourse)



rotuer.route('/:id').get(getSingleCourse )
.patch( editCourse)
.delete(deleteCourse)







module.exports=rotuer