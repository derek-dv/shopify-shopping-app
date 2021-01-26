import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/cartActions";
import CheckOutSteps from "../CheckOutSteps";

function Shipping(props) {
  const { userInfo } = useSelector((state) => state.signin);
  const { shippingAddress } = useSelector((state) => state.cart);
  if (!userInfo) {
    props.history.push("/signin?redirect=shipping");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };
  document.title = "Shipping";
  return (
    <div>
      <CheckOutSteps step1 step2 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            value={fullName}
            placeholder="Name..."
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            value={address}
            placeholder="Address..."
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            id="city"
            value={city}
            placeholder="City..."
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postal">Postal Code</label>
          <input
            id="postal"
            value={postalCode}
            placeholder="Postal Code..."
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            value={country}
            placeholder="Country..."
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label />
          <button className="primary">Continue</button>
        </div>
      </form>
    </div>
  );
}

export default Shipping;
