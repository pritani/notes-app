import  React from 'react'
import CategoryForm from './Form'
import axios from 'axios'
class CategoryEdit extends React.Component{
    constructor(){
        super()
        this.state={
            category:{}
        }
    }
    handleSubmit=(formData)=>{
        axios.put(`http://localhost:3015/categories/${this.props.match.params.id}`,formData)
        .then(response=>{
            const category=response.data
           // console.log(response.data)
            this.props.history.push(`http://localhost:3015/categories/${category._id}`)
        })
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
                <h2>Edit Category</h2>
                {
                    Object.keys(this.state.category).length!==0 && <CategoryForm {...this.state.category} handleSubmit={this.handleSubmit}/>
                }
            </div>
        )
    }
}
export default CategoryEdit