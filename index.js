const express=require('express')
const app=express()
const {body,validationResult}=require('express-validator')
app.use(express.json());
const courses=[
    {
        id:1,
        name:'JS Course',
        price:300
    },
    {
        id:2,
        name:'Java Course',
        price:300
    },
    {
        id:3,
        name:'Express Course',
        price:300
    }
]
app.get('/courses',(_,res)=>{
    return res.status(400).json(courses)
})
app.get('/courses/:id',(req,res)=>{
    let course=courses.filter((course)=>course.id===Number(req.params.id))
    if(course.length===0){
        res.status(404).end('not found')
    }
    res.json(course[0])
})
app.post('/courses',body('name').notEmpty().withMessage('name is required')
.isLength({min:2}).withMessage('name should be more than 2 charchets')
,body('price').notEmpty().withMessage('price must be provided')
.isInt({min:1}).withMessage('your price is not valid')
,(req,res)=>{
    console.log(body)
    console.log(validationResult(req))
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json(validationResult(req).errors)
    }
    courses.push({
        id:courses.length+1,
        name:req.body.name,
        price:req.body.price
    })
    res.json({msg:'course added successfully'})
})
app.listen('5000',()=>{
    console.log('listening on 5000')
})