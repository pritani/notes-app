const express=require('express')
//npm install mongoose
const mongoose=require('mongoose')
const app=express()
app.use(express.json())
const port=3015
//mongodb connecton configuration 
mongoose.connect('mongodb://localhost:27017/oct-notes-app',{ useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log('error',err)
})



//Schema
const Schema=mongoose.Schema
const noteSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }
})

const Note=mongoose.model('Note',noteSchema)

//category
const  categorySchema=new Schema({
    name:{
        type:String,
        required:true
    }
})
const Category=mongoose.model('Category',categorySchema)


app.get('/',(req,res)=>{
   // res.send('welcome to the website')
    res.json({
        notice:'welcome to the website'
    })
})

app.get('/notes',(req,res)=>{
    Note.find().populate('category',['_id','name'])
    .then((notes)=>{
        res.json(notes)
    })
    .catch((err)=>{
        res.json(err)
    })
})
//inserting the data into the database
app.post('/notes',(req,res)=>{
    const body=req.body
    const note=new Note(body)
    note.save()//instance method 
    .then((note)=>{
        res.json(note)
    })
    .catch((err)=>{
        res.json(err)
    })
})

//trying to get specific note id
app.get('/notes/:id',(req,res)=>{
    const id=req.params.id
    Note.findById(id).populate('category')
    .then((note)=>{//note present or not will be checked in this .then..if not present else {}..it will resolve
        if(note){
            res.json(note)
        }else{
            res.json({})//note will be null--note is not empty object
        }
    })
    .catch((err)=>{
        res.json(err)
    })
})

//delete a record
app.delete('/notes/:id',(req,res)=>{
    const id=req.params.id
    Note.findByIdAndDelete(id)
    .then((note)=>{
        console.log('note',note)
    if(note){///promise will resolve.if we try to get the deleted data..we will get {}
      res.json(note)
    }else{
        res.json({})
    }
})
.catch((err)=>{
    res.json(err)
})
})
//updating a record from database
app.put('/notes/:id',(req,res)=>{
    const id=req.params.id
    const body=req.body
    Note.findByIdAndUpdate(id, body , { new:true, runValidators: true })
    .then((note)=>{
        if(note){
            res.json(note)
        }else{
            res.json({})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
})
//for category after
app.get('/categories',(req,res)=>{
    Category.find()
    .then((categories)=>{
        res.json(categories)
    })
    .catch((err)=>{
        res.json(err)
    })//[ ]
})

app.post('/categories',(req,res)=>{
    const body=req.body
    const category=new Category(body)
    category.save()
    .then((category)=>{
        res.json(category)
    })
    .catch((err)=>{
        res.json(err)
    })
})
app.listen(port,()=>{
    console.log('listening on port',port)
})