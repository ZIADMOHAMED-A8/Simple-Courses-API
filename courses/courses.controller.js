const { validationResult } = require("express-validator");
const course = require("./courses.model");
const asyncWrapper = require("../moddleware/asyncWrapper");
const { SUCCESS, FAIL } = require("../utils/httpStatusText");
const AppError = require("../utils/appError");

const addCourse = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new AppError(
                "Validation failed",
                400,
                FAIL,
                errors.array()
            )
        );
    }

    const newCourse = new course({
        title: req.body.title,
        price: req.body.price,
    });

    await newCourse.save();

    res.status(201).json({
        status: SUCCESS,
        data: newCourse,
    });
});

const getCourses = asyncWrapper(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const courses = await course
        .find({}, { __v: false })
        .limit(limit)
        .skip(skip);

    res.json({
        status: SUCCESS,
        data: courses,
    });
});

const getSingleCourse = asyncWrapper(async (req, res, next) => {
    const courseResult = await course.findById(req.params.id);

    if (!courseResult) {
        return next(
            new AppError(
                "Course not found",
                404,
                FAIL
            )
        );
    }

    res.json({
        status: SUCCESS,
        data: {
            course: courseResult,
        },
    });
});

const editCourse = asyncWrapper(async (req, res, next) => {
    const updatedCourse = await course.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    );

    if (!updatedCourse) {
        return next(
            new AppError(
                "Course not found",
                404,
                FAIL
            )
        );
    }

    res.json({
        status: SUCCESS,
        data: {
            course: updatedCourse,
        },
    });
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
    console.log(req.params.id,"id not being")
    const deletedCourse = await course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
        return next(
            new AppError(
                "Course not found",
                404,
                FAIL
            )
        );
    }

    res.json({
        status: SUCCESS,
        data: null,
    });
});

module.exports = {
    addCourse,
    getCourses,
    getSingleCourse,
    editCourse,
    deleteCourse,
};