const express=require('express')
const app=express()
app.use(express.json());
const courses=[
    {
        id:1,
        name:'JS Course'
    },
    {
        id:2,
        name:'Java Course'
    },
    {
        id:3,
        name:'Express Course'
    }
]
app.get('/courses',(_,res)=>{
    res.json(courses)
})
app.get('/courses/:id',(req,res)=>{
    let course=courses.filter((course)=>course.id===Number(req.params.id))
    if(course.length===0){
        res.status(404).end('not found')
    }
    res.json(course[0])
})
app.post('/courses',(req,res)=>{
    let id=courses.length+1
    const data=req.body
   if( !data.name || data.length<1 || data.length>1){
    res.status(422).end('invalid data')
   }
    courses.push({
        name:data.name,
        id
    })
    res.json({msg:'course added successfully'})
})
app.listen('5000',()=>{
    console.log('listening on 5000')
})