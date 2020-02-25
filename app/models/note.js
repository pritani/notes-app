const mongoose=require('mongoose')

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
       // required:true
    },
    noteimage:{//last step
        type:String
    }
    //add 
})

const Note=mongoose.model('Note',noteSchema)
module.exports=Note