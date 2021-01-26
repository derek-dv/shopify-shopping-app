import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/cartActions";
import CheckOutSteps from "../CheckOutSteps";

function Payment(props) {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  if (!shippingAddress.address) props.history.push("/shipping");
  const [payment, setPayment] = useState("Paypal");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckOutSteps step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment</h1>
        </div>
        <div>
          <input
            id="paypal"
            name="payment"
            value="Paypal"
            type="radio"
            required
            checked
            onChange={(e) => setPayment(e.target.value)}
          />
          <label htmlFor="paypal">Paypal</label>
        </div>
        <div>
          <input
            id="stripe"
            name="payment"
            value="Stripe"
            type="radio"
            required
            onChange={(e) => setPayment(e.target.value)}
          />
          <label htmlFor="stripe">Stripe</label>
        </div>
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default Payment;
