import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../Brewtique.actions';

class ProductPage extends React.Component {
    componentDidMount() {
        this.props.fetchPageData(this.props.params.product_id);
    }
    render () {
        return (
            <div className="product-page-content">
                <h1>{this.props.product_name}</h1>
                <img className="product-page-image" src={this.props.product_image}/>
                <br/><br/>
                <p>Brewery: {this.props.brewery}</p><br/>
                <p>Style: {this.props.type}</p><br/>
                <p>Description: {this.props.description}</p><br/>
                <p>Price: ${parseFloat(this.props.price).toFixed(2)}</p>
                <br/>
                <button className="btn btn-success">Add to Cart</button>
            </div>
        );
    }
}


const ProductPageContainer = ReactRedux.connect(
    function(state) {
        return state.brewtique
    },
    actions
)(ProductPage);

export default ProductPageContainer;
