import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/userActions";
import Messages from "../Messages";
import Loading from "../Loading";

const SigninScreen = (props) => {
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.signin);
  const { userInfo, loading, error } = userSignin;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
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
          <h1>Sign In</h1>
          {loading && <Loading />}
          {error && <Messages variant="danger">{error}</Messages>}
          <label htmlFor="email">Email Address</label>
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
          <label />
          <button type="submit" className="primary">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigninScreen;
