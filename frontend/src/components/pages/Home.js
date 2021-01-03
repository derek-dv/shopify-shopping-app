import React, { Component } from "react";
import Product from "../Product";
import Loading from "../Loading";
import Messages from "../Messages";
import { listProduct } from "../../actions/listProducts";
import { connect } from "react-redux";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.listProduct();
  }
  render() {
    return (
      <div>
        {this.props.loading ? (
          <Loading />
        ) : this.props.error ? (
          <Messages variant="danger">{this.props.error}</Messages>
        ) : (
          <div className="row center">
            {this.props.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  }
}
const mapState = (state) => ({
  products: state.products.products,
  loading: state.products.loading,
  error: state.products.error,
});
export default connect(mapState, { listProduct })(Home);
