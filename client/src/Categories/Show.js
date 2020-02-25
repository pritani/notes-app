import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class CategoryShow extends React.Component{
constructor(){
    super()
        this.state={
            category:{}
    }
}
componentDidMount(){
    const id=this.props.match.params.id
    axios.get(`http://localhost:3015/categories/${id}`)
    .then(response=>{
        const category=response.data
        this.setState({category})
    })

}
    render(){
        return(
            <div>
                <h1>Category Show</h1>
                <p>{this.state.category.name}</p>
        <Link to={`/categories/edit/${this.props.match.params.id}`}>Edit</Link>
        <Link to="/categories">back</Link>
         </div>
        )
    }

}
export default CategoryShow