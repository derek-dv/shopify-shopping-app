import React, { Component } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

class Product extends Component {
  render() {
    return (
      <div key={this.props.product.id} className="card">
        <Link to={`product/${this.props.product._id}`}>
          <img
            className="medium"
            src={this.props.product.image}
            alt={this.props.product.name}
          />
        </Link>
        <div className="card-body">
          <Link to={`product/${this.props.product._id}`}>
            <h2>{this.props.product.name}</h2>
          </Link>
          <Rating
            rating={this.props.product.rating}
            numReviews={this.props.product.numReviews}
          />
          <div className="price">{this.props.product.price}</div>
        </div>
      </div>
    );
  }
}

export default Product;
