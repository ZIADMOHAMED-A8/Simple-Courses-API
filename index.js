const express = require('express')
const app = express()
app.use(express.json());
const url='mongodb+srv://ziadmohamed:012012012zZ!@learn-mongodb.u0tcvp0.mongodb.net/mongo_learning'
const mongoose=require('mongoose')
mongoose.connect(url).then(()=>{
    console.log('mongo db connected')
})
const coursesRouter=require('./courses/courses.routes')
app.use('/courses',coursesRouter)
app.listen('5000', () => {
    console.log('listening on 5000')
})