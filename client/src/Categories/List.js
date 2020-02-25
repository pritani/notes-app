import React from 'react'
import axios from 'axios'
import CategoryForm from './Form'
import {Link} from 'react-router-dom'
import { Table, Container, Button } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


class CategoryList extends React.Component{
    constructor(){
        super()
        this.state={
            categories:[]
        }

    }
    componentDidMount(){
        axios.get('http://localhost:3015/categories')
        
        .then(response=>{
            const categories=response.data
            this.setState({categories})
            console.log(categories)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleSubmit=(formData)=>{
        axios.post(`http://localhost:3015/categories`,formData)
        .then(response=>{
            const category=response.data
            this.setState(prevState=>({
                categories:prevState.categories.concat(category)
            }))
        })
    }
    handleRemove=(id)=>{
        axios.delete(`http://localhost:3015/categories/${id}`)
        .then(response=>{
            this.setState((prevState)=>({
categories:prevState.categories.filter(category=>category._id!==response.data._id)

            }))

        })
    }
    
    render(){
        return(
            <Container>
{/*
<Table dark>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
*/}

                <h1>Listing categories-{this.state.categories.length}</h1>

                <Table dark>
                    <thead>
                        <th>#</th>
                        <th>Name</th>
                        <th>Detail</th>
                        <th>Remove</th>
                    </thead>

                    <tbody>
                    {this.state.categories.map((category, i)=>{
                        return (
                            <tr>
                        <td>{i+1}</td>
                    <td>{category.name}</td>
                        <td><Link to={`/categories/${category._id}`}> <Button color="success">Show</Button>{' '}</Link></td>
                        <td> <Button color="danger" onClick={()=>{this.handleRemove(category._id)}}>Remove</Button>{' '}</td>
                        </tr>
                        )
                    })}
                    </tbody>
                </Table>
                {/*
                <ul>
                    {this.state.categories.map(category=>{
                        return <li key={category._id}>{category.name}
                        <Link to={`/categories/${category._id}`}>Show</Link>
                        <button onClick={()=>{this.handleRemove(category._id)}}>Remove</button>
                    
                        </li>
                    })}
                </ul>
                */}
               <CategoryForm handleSubmit={this.handleSubmit}/>
            </Container>
        )
    }

}
export default CategoryList