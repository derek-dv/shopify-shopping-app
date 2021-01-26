import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import Messages from "../Messages";
import Loading from "../Loading";

const Register = (props) => {
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [password2, setPasssword2] = useState("");
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.register);
  const { userInfo, loading, error } = userRegister;

  const onSubmit = (e) => {
    e.preventDefault();
    if (password2 === password) dispatch(register(name, email, password));
    else alert("Passwords do not match");
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <div>
          <h1>Register</h1>
          {loading && <Loading />}
          {error && <Messages variant="danger">{error}</Messages>}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPasssword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="Confirm Password"
            required
            onChange={(e) => setPasssword2(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button type="submit" className="primary">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            Already a customer?{" "}
            <Link to={`/signin?redirect=${redirect}`}>
              Login in to your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
