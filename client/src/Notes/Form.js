import React from 'react'
import axios from 'axios'
import './Note.css'
import {Button,Form,FormGroup,Label,Input} from 'reactstrap'
//import {FacebookLoginButton} from 'react-social-login-buttons'
class NotesForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:props.title?props.title:'',
            description:props.description?props.description:'',
            categories:[],
            category:props.category?props.category:'',
            noteimage:props.noteimage?props.noteimage:''
        }
        }
        componentDidMount(){
            console.log('componentDid mount')
axios.get('http://localhost:3015/categories')
        
            .then(response=>{
                const categories=response.data
                console.log(categories)

                this.setState({categories})
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            title:this.state.title,
            description:this.state.description,
            category:this.state.category
        }
        const form=new FormData()
        for(let key in formData){
            form.append(key,formData[key])
        }
        form.append('noteimage',this.state.noteimage)
        console.log(form)

        this.props.handleSubmit(form)
    }
handleOnFile=(e)=>{
    console.log(e.target.files)
    this.setState({
        noteimage:e.target.files[0]//?
    })

}
        render(){
            console.log('render form')
            return(
                <div>
                <form  onSubmit={this.handleSubmit} enctype="multipart/form-data" className="Note">
                    <formGroup>
                    <label htmlFor="title">title</label>
                    <input type="text" value={this.state.title} name="title" onChange={this.handleChange} id="title"/><br/>
                    <label htmlFor="description">description</label>
                    <input type="text" value={this.state.description} name="description" onChange={this.handleChange} id="description"/><br/>
                  <input type="file" name="noteimage" id="noteimage" onChange={this.handleOnFile}/>
                    <label>category</label>
<select name="category" value={this.state.category} onChange={this.handleChange}>
 <option value="">select</option>   
 {this.state.categories.map((category)=>{
     return(
         <option key={category._id} value={category._id}>{category.name}</option>
     )
 })
 }
</select><br/>
</formGroup>
                 <input type="submit"/>
                   
                    </form>
                    </div>
            )
        }
    }
export default NotesForm