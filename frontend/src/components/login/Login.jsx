import { useState } from "react";
import "./login.css";

import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import Footer from "../footer/Footer";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setUserpass] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    // khi login thanh cong => not refresh page
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };

  return (
    <div>
      <section className="login-container">
        <div className="login-title"> Log in</div>
        <form onSubmit={handleLogin}>
          <label>USERNAME</label>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setUserpass(e.target.value)}
          />

          <button type="submit"> Continue </button>
        </form>
        <div className="login-register"> Don't have an account yet? </div>
        <Link className="login-register-link" to="/register">
          Register one for free{" "}
        </Link>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
