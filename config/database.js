const mongoose=require('mongoose')
//mongodb connecton configuration 
//inside one function we write the configuration
const setupDB=()=>{
mongoose.connect('mongodb://localhost:27017/oct-notes-app',{ useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log('error',err)
})

}
module.exports=setupDB