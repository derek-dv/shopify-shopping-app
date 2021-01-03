import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeCart } from "../../actions/cartActions";
import Messages from "../Messages";

function AddToCart(props) {
  const id = props.match.params.id;
  const qty = props.location.search ? props.location.search.split("=")[1] : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCart = (id) => {
    dispatch(removeCart(id));
  };
  const checkout = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Messages>
            Cart is empty <Link to="/">Go Shopping</Link>
          </Messages>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      className="small"
                      src={item.image}
                      alt={item.name}
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + Number(c.qty), 0)}{" "}
                items ) : $
                {cartItems.reduce(
                  (a, c) => a + Number(c.qty) * Number(c.price),
                  0
                )}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkout}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Check out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
