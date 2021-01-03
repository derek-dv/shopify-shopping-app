import { Link } from "react-router-dom";
import Rating from "../Rating";

import React, { Component } from "react";
import { connect } from "react-redux";
import { productDetails } from "../../actions/listProducts";
import Loading from "../Loading";
import Messages from "../Messages";
import PropTypes from "prop-types";

export class ProductScreen extends Component {
  constructor() {
    super();
    this.state = { qty: 1 };
  }
  componentDidMount() {
    this.props.productDetails(this.props.match.params.id);
    console.log(this.props.loading);
  }

  static propTypes = {
    productDetails: PropTypes.func.isRequired,
  };
  addToCart = () => {
    this.props.history.push(
      `/cart/${this.props.match.params.id}?qty=${this.state.qty}`
    );
  };

  render() {
    console.log(this.props.history);
    const product = this.props.product;
    return (
      <div>
        {this.props.loading ? (
          <Loading />
        ) : this.props.error ? (
          <Messages variant="danger">{this.props.error}</Messages>
        ) : (
          <div className="row top">
            <Link to="/">Back to Home</Link>
            <div className="col-2">
              <img className="large" src={product.image} alt={product.name} />
            </div>
            <div className="col-1">
              <ul>
                <li>{product.name}</li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>
                <li>Price: {product.price}</li>
                <li>
                  Description: <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In stock</span>
                        ) : (
                          <span className="error">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={this.state.qty}
                              onChange={(e) =>
                                this.setState({ qty: e.target.value })
                              }
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <button
                            className="primary block"
                            onClick={this.addToCart}
                            style={{ marginTop: "1em" }}
                          >
                            Add To Cart
                          </button>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.productDetails.loading,
  error: state.productDetails.error,
  product: state.productDetails.product,
  // id: state.productDetails.product.id,
  // category: state.productDetails.product.category,
  // name: state.productDetails.product.name,
  // image: state.productDetails.product.image,
  // countInStock: state.productDetails.product.countInStock,
  // price: state.productDetails.product.price,
  // brand: state.productDetails.product.brand,
  // rating: state.productDetails.product.rating,
  // numReviews: state.productDetails.product.numReviews,
  // description: state.productDetails.product.description,
});

export default connect(mapStateToProps, { productDetails })(ProductScreen);
