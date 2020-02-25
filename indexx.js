const express=require('express')
const app=express()
const port=3020
app.get('/',(req,res)=>{
   // res.send('welcome to the website')
   res.json({
       msg:"welcome the the website"
   })
})
app.listen(port,()=>{
    console.log('listening on port',port)
})