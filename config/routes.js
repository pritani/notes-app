const express=require('express')
const router=express.Router()
const categoriesController=require('../app/controllers/categoriesController')
const notesController=require('../app/controllers/notesController')

const mongoose=require('mongoose')
const path=require('path')
const bodyParser=require('body-parser')

const Note=require('../app/models/note')
//importing the multer
const multer=require('multer')//step 1
//we give the option for the file what will be the name of the file and what will be the path of the file
const storage=multer.diskStorage({//step 4--implementing storage strategy--how file get stores--2 propperties-
    destination:function(req,file,cb){//where the incoming file will get store--when new file is recieved--
        //automatically multer will
       cb(null,'./uploads/')
    },
    filename:function(req,file,cb){//what the filename properties should be(in upload folder)
        cb(null,file.originalname)//error-null,
    }
})
//step5--now we want the image to see on browser..get request handle..set in database first--go to model
//we will pass storage object to the multer options//{dest:'uploads/'}
const upload=multer({storage:storage})//step 2-..this multer object will give us all possibility to add.
//its not publically accessible-this is the place where multer will store all incoming files--go to app.js
//add additional property like limit,type--filesize:1024kb
router.get('/notes',notesController.list)
router.get('/notes/:id',notesController.show)//noteImage is name of the field
router.post('/notes',upload.single('noteimage'),notesController.create)//multer will work before 
//notesController will work..single means we will get one file only
router.put('/notes/:id',notesController.update)
router.delete('/notes/:id',notesController.destroy)
//categories

router.get('/categories',categoriesController.list)
router.get('/categories/:id',categoriesController.show)
router.post('/categories',categoriesController.create)
router.put('/categories/:id',categoriesController.update)
router.delete('/categories/:id',categoriesController.destroy)

module.exports=router
//3015