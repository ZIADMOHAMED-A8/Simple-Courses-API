const express=require('express')
const app=express()
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
        id:1,
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
app.listen('5000',()=>{
    console.log('listening on 5000')
})