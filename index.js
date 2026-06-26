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
    res.end(JSON.stringify(courses))
})
app.listen('5000',()=>{
    console.log('listening on 5000')
})