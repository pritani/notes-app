const express=require('express')
//npm install mongoose
const router=require('./config/routes')
const cors=require('cors')
const setDB=require('./config/database')

const app=express()
app.use(express.json())
const port=3015

app.use(cors())
app.use('/uploads',express.static('uploads'))//step 7--file is available to everyone..middleware

setDB()

app.get('/',(req,res)=>{
   // res.send('welcome to the website')
    res.json({
        notice:'welcome to the website'
    })
})

app.use('/',router)
app.listen(port,()=>{
    console.log('listening on port',port)
})