const Note=require('../models/note')

module.exports.list=(req,res)=>{/// empty object so use list method
    Note.find().populate('category',['_id','name'])
    .then((notes)=>{
        res.json(notes)
    })
    .catch((err)=>{
        res.json(err)
    })
} 
module.exports.show=(req,res)=>{//getting specific data
        const id=req.params.id
        Note.findById(id).populate('category',['_id','name'])
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
}
module.exports.create=(req,res)=>{
    console.log(req.file)//step 3..we get req.file and req.body with multer--see in console

    const body=req.body
    console.log(body)//from model 
    //step 5--we cant get the url from multer..so how to get??..we have path property--
    body.noteimage=req.file.path//storing path--?body.noteImage
    console.log(body)
    
    //creatig the object by the constructor of the Notes
    const note=new Note(body)

    //saving into the mongodb by save() method
    note.save()//instance method 
    .then((note)=>{
        res.json(note)
    })
    .catch((err)=>{
        res.json(err)
    })

}
module.exports.update=(req,res)=>{
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

}
module.exports.destroy=(req,res)=>{
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
}

