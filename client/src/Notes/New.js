import React from 'react'
import axios from 'axios'
import NoteForm from './Form'

class NoteNew extends React.Component{
    handleSubmit=(formData)=>{
        
        axios.post(`http://localhost:3015/notes`,formData)
        .then(response=>{
            console.log(response.data)
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }
            else{
                this.props.history.push('/notes')
            }
        })
    }
    render(){
        return(
            <div>
                <h1>Add Note</h1>
                <NoteForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}
export default NoteNew