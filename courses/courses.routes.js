const express = require('express')
const { body } = require('express-validator')

const rotuer=express.Router()
let {addCourse,getCourses,editCourse,deleteCourse,getSingleCourse}=require('./courses.controller')
rotuer.route('/')
.get( (req,res)=>getCourses(req,res))
.post(body('name').notEmpty().withMessage('name is required')
    .isLength({ min: 2 }).withMessage('name should be more than 2 charchets')
    , body('price').notEmpty().withMessage('price must be provided')
        .isInt({ min: 1 }).withMessage('your price is not valid')
    , (req,res)=>addCourse(req,res))



rotuer.route('/:id').get((req,res)=>getSingleCourse(req,res) )
.patch( (req,res)=>editCourse(req,res))
.delete((req,res)=>deleteCourse(req,res))







module.exports=rotuer