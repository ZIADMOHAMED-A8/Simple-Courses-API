const { validationResult } = require('express-validator')
const course = require('./courses.model')

const addCourse = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(validationResult(req).errors)
    }
    console.log(req.body)
    const newCourse = await new course({
        title: req.body.title,
        price: req.body.price
    }
    )
    await newCourse.save()
    res.json({ msg: 'course added successfully' })
}


const getCourses = async (_, res) => {
    const courses = await course.find();
    return res.status(200).json(courses)
}


const editCourse = async (req, res) => {
    let id = req.params.id
    try {
       const updatedCourse= await course.findByIdAndUpdate(id, { $set: {...req.body}},{new:true})
        return res.json({msg:"updated",course:updatedCourse})
    }
    catch (e){
        return res.status(400).json({ msg: e.message })
    }
}

const deleteCourse = async (req, res) => {
    let id = req.params.id
    try{
        let coruseResult=await course.findByIdAndDelete(id)
        return res.json({msg:'course deleted'},coruseResult)
    }
    catch(e){
        return res.status(400).json({mag:e.message})
    }
    
}

const getSingleCourse = async (req, res) => {


    try {
        const courseResult = await course.findById(req.params.id)
        if (!courseResult) {
            return res.status(404).json({ msg: "Course not found" }) // if the find by id doenst throw an error, then the id passed is valid object id but id doesnt exist if its null so its not found

        }
        return res.json(courseResult)
    }
    catch {
        return res.status(400).json({ msg: "not valid ID" }) // if the findbyid throws an error that means it is not a valid object id
    }



}

module.exports = {
    addCourse,
    getCourses,
    editCourse,
    deleteCourse,
    getSingleCourse
}