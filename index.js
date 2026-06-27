const express = require('express')
const app = express()
app.use(express.json());
const coursesRouter=require('./courses/courses.routes')
app.use('/courses',coursesRouter)
app.listen('5000', () => {
    console.log('listening on 5000')
})