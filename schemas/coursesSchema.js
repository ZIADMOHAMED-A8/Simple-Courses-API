const { z, coerce } = require('zod')

const paramsSchema=z.object({
    id: z.string('please provide an id')
})

const addCourseSchema = z.object({
    body: z.object({
        title: z.string({
            error: "please provide the course's title"
        }),
        price: z.coerce.number({
            error: "please provide the course's price"
        }),
    })
})

const getCoursesSchema = z.object({
    query: z.object({
        page: z.coerce.number('please provide a page number').min(1, "page number should be at least 1"),
        limit: z.coerce.number('please provide a limit'),

    })
})

const getSingleCourseSchema = z.object({
    params: paramsSchema
})

const deleteCourseSchema=z.object({
    params: paramsSchema
})

const editCourseSchema = z.object({
    params: paramsSchema,
    body: z.object({
        title: z.string({
            error: "please provide the course's title"
        }),
        price: z.coerce.number({
            error: "please provide the course's price"
        }),
    }).partial()
})

module.exports = {
    addCourseSchema,
    getCoursesSchema,
    getSingleCourseSchema,
    editCourseSchema,
    deleteCourseSchema
}