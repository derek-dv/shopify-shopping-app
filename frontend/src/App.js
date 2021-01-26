import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import { connect } from "react-redux";
import ProductScreen from "./components/pages/ProductScreen";
import "./styles/font-awesome.min.css";
import AddToCart from "./components/pages/AddToCart";
import { cartList } from "./actions/cartActions";
import PropTypes from "prop-types";
import SigninScreen from "./components/pages/SigninScreen";
import store from "./store";
import { signout } from "./actions/userActions";
import Register from "./components/pages/Register";
import Shipping from "./components/pages/Shipping";
import Payment from "./components/pages/Payment";
import PlaceOrder from "./components/pages/PlaceOrder";

class App extends Component {
  static propTypes = {
    cartList: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.cartList();
  }

  signoutHandler = () => {
    store.dispatch(signout());
  };

  render() {
    const signin = this.props.signin;
    const { userInfo } = signin;
    console.log(signin);
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
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name} <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <Link to="#signout" onClick={this.signoutHandler}>
                      Sign out
                    </Link>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">sign in</Link>
              )}
            </div>
          </header>
          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route exact path="/cart/:id?" component={AddToCart} />
            <Route exact path="/signin" component={SigninScreen} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/shipping" component={Shipping} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/placeorder" component={PlaceOrder} />
          </main>
          <footer className="row center">All rights reserved</footer>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
  signin: state.signin,
});

export default connect(mapStateToProps, { cartList })(App);
