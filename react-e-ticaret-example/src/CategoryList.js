import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class CategoryList extends Component {
    state = {
        categories: []
    };

    componentDidMount(){
        this.getCategories();
    }

    getCategories = () => {
        fetch("http://localhost:3000/categories")
        .then(response => response.json())
        .then(data => this.setState({categories:data}));
    }

    render() {
        return (
            <div>
                <h3>{this.state.props}</h3>
                CategoryList
                <ListGroup>
                    {this.state.categories.map(category =>(
                    <ListGroupItem active={category.categoryName === this.props.currentCategory?true:false }
                    onClick={() => this.props.changeCategory(category)}
                    key={category.id}>{category.categoryName}
                    </ListGroupItem>
                ))}</ListGroup>
                {/* <h3>{this.props.currentCategory}</h3> */}
            </div>
        );
    }
}

export default CategoryList;