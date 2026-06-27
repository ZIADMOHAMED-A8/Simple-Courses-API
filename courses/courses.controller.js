const { courses } = require('../data/courses')
const {validationResult } = require('express-validator')

const addCourse = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(validationResult(req).errors)
    }
    courses.push({
        id: courses.length + 1,
        name: req.body.name,
        price: req.body.price
    })
    res.json({ msg: 'course added successfully' })
}

const getCourses = (_, res) => {
    return res.status(200).json(courses)
}

const editCourse = (req, res) => {
    let id = req.params.id
    if (!id) {
        res.status(400).json({ msg: 'please provide the course ID' })


    }
    if (!req?.body?.name && !req?.body?.price) {
        res.status(400).json({ msg: 'please specifiy course price or title' })

    }
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json(errors)
    }

    let course = courses.findIndex((course) => course.id === +id)
    if (course === -1) {
        return res.status(400).json('course not found')
    }
    courses[course].name = req.body.name ? req.body.name : courses[course].name
    courses[course].price = req.body.price ? req.body.price : courses[course].price
    res.json({ msg: 'updated' })
}

const deleteCourse = (req, res) => {
    let id = req.params.id
    
    if (!id) {
        return res.status(404).json('NO ID WAS PROVIDED')
    }
    let beforeLength = courses.length
    let newCourses=courses.filter((course) => course.id !== +id)
    let afterLength = newCourses.length
    if (afterLength === beforeLength) {
        return res.status(404).json('the course was not found')
    }

    console.log(courses)
    res.json({ msg: 'course deleted' })
}

const getSingleCourse = (req, res) => {
    let course = courses.filter((course) => course.id === Number(req.params.id))
    if (course.length === 0) {
        res.status(404).end('not found')
    }
    res.json(course[0])
}

module.exports = {
    addCourse,
    getCourses,
    editCourse,
    deleteCourse,
    getSingleCourse
}