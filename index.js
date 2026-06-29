const express = require('express')
const app = express()
const cors=require('cors')
const httpStatusText=require('./utils/httpStatusText')
const path=require('path')
app.use(cors())
app.use(express.json());
app.use((error,req,res,next)=>{
    res.json({status:httpStatusText})
})
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
const url=process.env.DB_URL
const port=process.env.PORT
const mongoose=require('mongoose')
mongoose.connect(url).then(()=>{
    console.log('mongo db connected')
})
const coursesRouter=require('./courses/courses.routes')
const userRouter = require('./users/users.routes')
app.use('/courses',coursesRouter)
app.use('/user',userRouter)
app.all('*splat',(req,res,next)=>{
    res.status(404).json({status:httpStatusText.ERROR,msg:'this resoruse is not avaialbe'})
})
app.use((err, req, res, next) => {
       res.status(500).json({
        status: httpStatusText.FAIL,
        message: err.message
    });
});
app.listen(port, () => {
    console.log(`listening on ${port}`)
})