import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Table, Container, Button } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class NotesShow extends React.Component{
constructor(){
    super()
        this.state={
            note:{}
    }
}
componentDidMount(){
    const id=this.props.match.params.id
    axios.get(`http://localhost:3015/notes/${id}`)
    .then(response=>{
        const note=response.data
        this.setState({note})
    })

}
    render(){
        return(
            <Container>
            <div>
                 <h1>Notes Show</h1>
                 <Table dark>
                   <thead>
                       <th>#</th>
                       <th>Title</th>
                       <th>Description</th>
                     
                   </thead>
                   <tbody>
                           <tr>
                               <td>1</td>
                               <td>{this.state.note.title}</td>
                               <td>{this.state.note.description}</td>
                           </tr>
                       
                   </tbody>
               </Table>
              {/*  <h1>Notes Show</h1>
                <p>{this.state.note.title}--{this.state.note.description}</p>
        <Link to={`/notes/edit/${this.props.match.params.id}`}>Edit</Link>
              <Link to="/notes">back</Link>*/}
         </div>
         </Container>
        )
    }

}
export default NotesShow