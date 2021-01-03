import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import { connect } from "react-redux";
import ProductScreen from "./components/pages/ProductScreen";
import "./styles/font-awesome.min.css";
import AddToCart from "./components/pages/AddToCart";
import { cartList } from "./actions/cartActions";
import PropTypes from "prop-types";

class App extends Component {
  static propTypes = {
    cartList: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.cartList();
  }

  render() {
    console.log(this.props.cart);
    const cartItems = this.props.cart;
    return (
      <Router>
        <div className="grid-container">
          <header className="row">
            <div>
              <Link className="brand" to="/">
                shopify
              </Link>
            </div>
            <div>
              <Link to="/cart">
                cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
              <Link to="/">sign in</Link>
            </div>
          </header>
          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route exact path="/cart/:id?" component={AddToCart} />
          </main>
          <footer className="row center">All rights reserved</footer>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
});

export default connect(mapStateToProps, { cartList })(App);
