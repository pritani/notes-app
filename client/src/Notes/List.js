import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Table, Container, Button } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
class NotesList extends React.Component{
    constructor(){
        super()
        this.state={
            notes:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3015/notes')
        
        .then(response=>{
            const notes=response.data
            this.setState({notes})
            console.log(notes)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleRemove=(id)=>{
        axios.delete(`http://localhost:3015/notes/${id}`)
        .then(response=>{
            this.setState((prevState)=>({
notes:prevState.notes.filter(note=>note._id!==response.data._id)

            }))

        })
    }
    
    render(){
        return(
            <Container>
            <div>
                <h1>Listing notes-{this.state.notes.length}</h1>
               <Table dark>
                   <thead>
                       <th>#</th>
                       <th>Title</th>
                       <th>Detail</th>
                       <th>Remove</th>
                   </thead>
                   <tbody>
                   {this.state.notes.map((note,i)=>{
                       return (
                           <tr>
                               <td>{i+1}</td>
                               <td>{note.title}</td>
                               <td><Link to={`/notes/${note._id}`}><Button color="success">Show</Button>{' '}</Link></td>
                               <td> <Button color="danger" onClick={()=>{this.handleRemove(note._id)}}>Remove</Button>{' '}</td>
                           </tr>
                       )
                   })}
                   </tbody>
               </Table>
               {/*
                <ul>
                    {this.state.notes.map(note=>{
                        return <li key={note._id}>{note.title}
                        <Link to={`/notes/${note._id}`}>Show</Link>
                        <button onClick={()=>{this.handleRemove(note._id)}}>Remove</button>
                    
                        </li>
                    })}
                </ul>
                */}
                <Link to="notes/new">Add Notes</Link>
            </div>
            </Container>
        )
    }

}
export default NotesList