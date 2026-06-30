const express = require('express')
const { body } = require('express-validator')
const rotuer=express.Router()
let {addCourse,getCourses,editCourse,deleteCourse,getSingleCourse}=require('./courses.controller')
const { authorize } = require('../moddleware/verofyRoles')
const roles = require('../utils/rolesArray')
const { addCourseSchema, getCoursesSchema, getSingleCourseSchema, editCourseSchema,deleteCourseSchema } = require('../schemas/coursesSchema')

const { validate } = require('../moddleware/validateSchemas')
const verifyToken = require('../moddleware/verifyToken')
rotuer.route('/')
.get(verifyToken,authorize([roles.manager]),validate(getCoursesSchema),getCourses)
.post(validate(addCourseSchema),addCourse)
rotuer.route('/:id').get(validate(getSingleCourseSchema),getSingleCourse)
.patch(validate(editCourseSchema),editCourse)
.delete(validate(deleteCourseSchema),authorize([roles.admin,roles.manager]),deleteCourse)







module.exports=rotuer